import { expect, type Page } from "@playwright/test";
import { DAILY_MINUTES_KEY, GROSS_SALARY_KEY, MONTHLY_HOURS_KEY } from "@/lib/storage";
import { test } from "./support/fixtures";
import { assertLr1, assertLr2b, driveC5, driveUntil, lineBoxesAndCharacters } from "./support/legibility";

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

const DISCLOSURE_SELECTOR = "#weekday-tier-disclosure";
const EXTRA_TIER_ROW_TEXT = "Extra 100%";
const DSR_ROW_TEXT = "DSR de extras e noturno";
const WAIT_AFTER_NETWORK_IDLE_MS = 1400;

interface DisclosureState {
  name: string;
  exempt: boolean;
  seed: (page: Page) => Promise<void>;
  reach: (page: Page) => Promise<void>;
}

async function minimumNonLastLineBoxCharacters(page: Page, selector: string): Promise<number | null> {
  return page.evaluate((disclosureSelector) => {
    const element = document.querySelector(disclosureSelector);
    const textNode = element?.firstChild;
    if (!element || !(textNode instanceof Text)) throw new Error("disclosure has no single text node");

    const range = document.createRange();
    const lineBoxLengths: number[] = [];
    let currentTop: number | null = null;

    for (let index = 0; index < textNode.length; index += 1) {
      range.setStart(textNode, index);
      range.setEnd(textNode, index + 1);
      const rect = range.getClientRects()[0];
      if (!rect) continue;

      const top = Math.round(rect.top);
      if (top !== currentTop) {
        lineBoxLengths.push(0);
        currentTop = top;
      }
      lineBoxLengths[lineBoxLengths.length - 1] += 1;
    }

    if (lineBoxLengths.length <= 1) return null;
    return Math.min(...lineBoxLengths.slice(0, -1));
  }, selector);
}

async function seedSalary(page: Page): Promise<void> {
  await page.addInitScript(
    ([grossSalaryKey, monthlyHoursKey, dailyMinutesKey]) => {
      localStorage.setItem(grossSalaryKey, "15000");
      localStorage.setItem(monthlyHoursKey, "220");
      localStorage.setItem(dailyMinutesKey, "528");
    },
    [GROSS_SALARY_KEY, MONTHLY_HOURS_KEY, DAILY_MINUTES_KEY],
  );
}

const STATES: readonly DisclosureState[] = [
  {
    name: "S1",
    exempt: true,
    seed: async () => {},
    reach: async () => {},
  },
  {
    name: "S2",
    exempt: false,
    seed: seedSalary,
    reach: async (page) => {
      await expect(page.locator(DISCLOSURE_SELECTOR)).toBeVisible();
    },
  },
  {
    name: "S3",
    exempt: false,
    seed: seedSalary,
    reach: async (page) => {
      await driveUntil(
        () => driveC5(page),
        () => page.getByText(DSR_ROW_TEXT).isVisible(),
        "S3",
      );
    },
  },
];

const MEASURED_STATES = STATES.filter((state) => !state.exempt).length;
const MEASURED_CELLS = MEASURED_STATES * VIEWPORTS.length * THEMES.length;
const EXEMPT_CELLS = STATES.filter((state) => state.exempt).length * VIEWPORTS.length * THEMES.length;
const TOTAL_CELLS = STATES.length * VIEWPORTS.length * THEMES.length;
const COVERAGE_LINE = `measured ${MEASURED_CELLS} + exempt ${EXEMPT_CELLS} = ${TOTAL_CELLS}`;

test.describe("Weekday-tier disclosure — legal.md §9.5", () => {
  test("covers exactly the 3 states across 2 viewports and 2 themes", () => {
    expect(STATES).toHaveLength(3);
    expect(TOTAL_CELLS).toBe(12);
    expect(MEASURED_CELLS).toBe(8);
    expect(EXEMPT_CELLS).toBe(4);
    test.info().annotations.push({ type: "state-coverage", description: COVERAGE_LINE });
  });

  for (const state of STATES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`${state.name} at ${viewport.width}x${viewport.height} ${theme}`, async ({ page }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme: theme });
          await state.seed(page);
          await page.goto("/");
          await state.reach(page);

          const disclosure = page.locator(DISCLOSURE_SELECTOR);
          const label = `${state.name} ${viewport.width}x${viewport.height} ${theme}`;

          test.info().annotations.push({ type: "cell-coverage", description: `${label} — ${COVERAGE_LINE}` });

          if (state.exempt) {
            await expect(disclosure).toHaveCount(0);
            await expect(page.getByRole("link", { name: /Calcule o valor da sua hora/ })).toBeVisible();
            return;
          }

          await expect(disclosure).toHaveCount(1);

          const space = await disclosure.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
              height: rect.height,
              left: rect.left,
              right: rect.right,
              opacity: getComputedStyle(element).opacity,
              scrollWidth: document.documentElement.scrollWidth,
            };
          });
          expect(space.height).toBeGreaterThan(0);
          expect(space.opacity).toBe("1");
          expect(space.left).toBeGreaterThanOrEqual(0);
          expect(space.right).toBeLessThanOrEqual(space.scrollWidth);

          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(WAIT_AFTER_NETWORK_IDLE_MS);
          await expect(disclosure).toBeVisible();

          await page.reload();
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(WAIT_AFTER_NETWORK_IDLE_MS);
          await expect(disclosure).toBeVisible();

          const modality = await disclosure.evaluate((element) => ({
            ariaLabel: element.getAttribute("aria-label"),
            title: element.getAttribute("title"),
            srOnlyAncestor: element.closest(".sr-only") !== null,
            textLength: element.textContent?.trim().length ?? 0,
            hiddenAncestor: element.closest("[hidden]") !== null,
            collapsedAncestor: element.closest('[aria-expanded="false"]') !== null,
            closedDetailsAncestor: element.closest("details:not([open])") !== null,
            clipped: Math.abs(element.getBoundingClientRect().height - element.scrollHeight) > 1,
          }));
          expect(modality.ariaLabel).toBeNull();
          expect(modality.title).toBeNull();
          expect(modality.srOnlyAncestor).toBe(false);
          expect(modality.textLength).toBeGreaterThan(0);
          expect(modality.hiddenAncestor).toBe(false);
          expect(modality.collapsedAncestor).toBe(false);
          expect(modality.closedDetailsAncestor).toBe(false);
          expect(modality.clipped).toBe(false);

          const geometry = await page.evaluate(
            ({ disclosureSelector, rowText }) => {
              const disclosureElement = document.querySelector(disclosureSelector);
              const rowSpan = Array.from(document.querySelectorAll("span")).find(
                (element) => element.textContent === rowText,
              );
              const rowElement = rowSpan?.parentElement ?? null;
              if (!disclosureElement || !rowElement) throw new Error("disclosure or extra-tier row not found");

              const disclosureRect = disclosureElement.getBoundingClientRect();
              const rowRect = rowElement.getBoundingClientRect();
              return {
                disclosureWidth: disclosureRect.width,
                rowWidth: rowRect.width,
                disclosureTop: disclosureRect.top,
                rowTop: rowRect.top,
              };
            },
            { disclosureSelector: DISCLOSURE_SELECTOR, rowText: EXTRA_TIER_ROW_TEXT },
          );
          expect(Math.abs(geometry.disclosureWidth - geometry.rowWidth)).toBeLessThanOrEqual(0.5);
          expect(geometry.disclosureTop).toBeGreaterThan(geometry.rowTop);

          const lr2bOutcome = await assertLr2b(disclosure);
          const { lineBoxes, characters } = await lineBoxesAndCharacters(disclosure);
          const minimumNonLastLineBox = await minimumNonLastLineBoxCharacters(page, DISCLOSURE_SELECTOR);
          test.info().annotations.push({
            type: "lr2b-reading",
            description: `${label} — ${lr2bOutcome}, lineBoxes=${lineBoxes}, characters=${characters}, minimumNonLastLineBox=${minimumNonLastLineBox ?? "n/a (single line)"}`,
          });

          await assertLr1(disclosure);
        });
      }
    }
  }
});
