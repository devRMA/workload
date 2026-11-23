import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, type Page } from "@playwright/test";
import { DAILY_MINUTES_KEY, GROSS_SALARY_KEY, MONTHLY_HOURS_KEY } from "@/lib/storage";
import { installExternalNetworkRoute, test } from "./support/fixtures";
import { driveUntil } from "./support/legibility";

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

const D4_TEXT =
  "Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.";

const HERO_FIGURE_SELECTOR = 'p[aria-live="polite"]';

interface DisclosureState {
  name: string;
  drive: (page: Page) => Promise<void>;
}

const STATES: readonly DisclosureState[] = [
  {
    name: "R1",
    drive: async (page) => {
      await driveUntil(
        () => page.getByLabel("Dias Trabalhados").fill("7"),
        () => page.getByText("A semana tem um dia de descanso").isVisible(),
        "R1",
      );
    },
  },
  {
    name: "R2",
    drive: async (page) => {
      await driveUntil(
        () => page.getByLabel("Jornada Diária").fill("1200"),
        async () => {
          const committed = (await page.getByLabel("Jornada Diária").inputValue()) === "12:00";
          const bannerVisible = await page.getByText("Sem divisor acima de 10 horas por dia").isVisible();
          return committed && bannerVisible;
        },
        "R2",
      );
    },
  },
  {
    name: "R3",
    drive: async (page) => {
      await driveUntil(
        () => page.getByLabel("Carga Horária Mensal").fill(""),
        () => page.getByText("Sem ela não dá para saber quanto vale a sua hora").isVisible(),
        "R3",
      );
    },
  },
  {
    name: "R4",
    drive: async (page) => {
      await driveUntil(
        () => page.getByLabel("Carga Horária Mensal").fill("200"),
        () => page.getByText("A carga mensal não combina com a sua semana").isVisible(),
        "R4",
      );
    },
  },
  {
    name: "Silêncio",
    drive: async (page) => {
      await expect(page.locator("#divisor-alert")).toHaveCount(0);
    },
  },
];

test.describe("Divisor disclosure — clauses 2a-2d", () => {
  test("covers exactly the five states of the Salário panel", () => {
    expect(STATES).toHaveLength(5);
  });

  for (const state of STATES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`${state.name} at ${viewport.width}x${viewport.height} ${theme}`, async ({ page }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme: theme });
          await page.goto("/custo-da-hora");
          await state.drive(page);

          const disclosure = page.locator("#divisor-disclosure");

          await expect(disclosure).toBeVisible();
          await expect(disclosure).toHaveText(D4_TEXT);

          const concealment = await disclosure.evaluate((element) => ({
            hiddenAncestor: element.closest("[hidden]") !== null,
            collapsedAncestor: element.closest('[aria-expanded="false"]') !== null,
            closedDetailsAncestor: element.closest("details:not([open])") !== null,
            clipped: Math.abs(element.getBoundingClientRect().height - element.scrollHeight) > 1,
          }));
          expect(concealment.hiddenAncestor).toBe(false);
          expect(concealment.collapsedAncestor).toBe(false);
          expect(concealment.closedDetailsAncestor).toBe(false);
          expect(concealment.clipped).toBe(false);

          const readingOrder = await page.evaluate(
            ({ figureSelector, disclosureSelector }) => {
              const figure = document.querySelector(figureSelector);
              const disclosureElement = document.querySelector(disclosureSelector);
              if (!figure || !disclosureElement) throw new Error("figure or disclosure not found");

              const rects = [
                { name: "figure", rect: figure.getBoundingClientRect() },
                { name: "disclosure", rect: disclosureElement.getBoundingClientRect() },
              ].sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

              return {
                firstIsFigure: rects[0].name === "figure",
                parentId: disclosureElement.parentElement?.id ?? null,
                panelContainsFigure: document.getElementById("salary-panel")?.contains(figure) ?? false,
                operableAncestor:
                  disclosureElement.closest("button") !== null ||
                  disclosureElement.closest("details") !== null ||
                  disclosureElement.closest("[aria-expanded]") !== null,
              };
            },
            { figureSelector: HERO_FIGURE_SELECTOR, disclosureSelector: "#divisor-disclosure" },
          );

          expect(readingOrder.firstIsFigure).toBe(true);
          expect(readingOrder.parentId).toBe("salary-panel");
          expect(readingOrder.panelContainsFigure).toBe(false);
          expect(readingOrder.operableAncestor).toBe(false);

          const precedence = await page.evaluate(() => {
            const panel = document.getElementById("salary-panel");
            if (!panel) throw new Error("salary panel not found");

            const children = Array.from(panel.children) as HTMLElement[];
            const sorted = children
              .map((child) => ({ id: child.id, rect: child.getBoundingClientRect() }))
              .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

            const fieldsIndex = sorted.findIndex((entry) => entry.id === "salary-fields");
            const nextAfterFields = sorted[fieldsIndex + 1]?.id ?? null;

            const disclosureTop = document.getElementById("divisor-disclosure")?.getBoundingClientRect().top ?? null;
            const otherTops = Array.from(panel.querySelectorAll('[role="alert"], [role="status"]')).map(
              (element) => element.getBoundingClientRect().top,
            );
            const detailsButton = Array.from(panel.querySelectorAll("button")).find((candidate) =>
              candidate.textContent?.includes("Impostos e Descontos"),
            );
            if (detailsButton) otherTops.push(detailsButton.getBoundingClientRect().top);

            return { nextAfterFields, disclosureTop, otherTops };
          });

          expect(precedence.nextAfterFields).toBe("divisor-disclosure");
          expect(precedence.disclosureTop).not.toBeNull();
          for (const top of precedence.otherTops) {
            expect(precedence.disclosureTop as number).toBeLessThan(top);
          }
        });
      }
    }
  }
});

interface CalibrationCondition {
  name: string;
  seed: readonly { name: string; value: string }[];
}

const CALIBRATION_CONDITIONS: readonly CalibrationCondition[] = [
  {
    name: "calibrado",
    seed: [
      { name: GROSS_SALARY_KEY, value: "3000" },
      { name: MONTHLY_HOURS_KEY, value: "220" },
      { name: DAILY_MINUTES_KEY, value: "528" },
      { name: "salaryPeriod", value: "hour" },
    ],
  },
  { name: "padrão", seed: [] },
];

const COOKIE_CONSENT_ENTRY = {
  name: "workload_cookie_consent",
  value: JSON.stringify({ telemetry: true, timestamp: 0 }),
};

interface CalibrationRow {
  condition: CalibrationCondition;
  theme: (typeof THEMES)[number];
  state: DisclosureState;
}

test.describe("clause 2d — calibration, recorded rather than asserted as a bar", () => {
  test("records D4's top, the divisor banner's top, the salário-bruto banner and their margin at 390x844, seeded and unseeded", async ({
    browser,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "recorded once, so three projects do not race on one file");

    const baseURL = testInfo.project.use.baseURL;
    if (!baseURL) throw new Error("baseURL not configured");

    const rows: CalibrationRow[] = [];
    for (const condition of CALIBRATION_CONDITIONS) {
      for (const theme of THEMES) {
        for (const state of STATES) {
          rows.push({ condition, theme, state });
        }
      }
    }
    expect(rows).toHaveLength(20);

    const lines: string[] = [];

    for (const row of rows) {
      const context = await browser.newContext({
        baseURL,
        serviceWorkers: "block",
        viewport: { width: 390, height: 844 },
        colorScheme: row.theme,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: baseURL,
              localStorage: [COOKIE_CONSENT_ENTRY, ...row.condition.seed],
            },
          ],
        },
      });
      await installExternalNetworkRoute(context, baseURL);
      const page = await context.newPage();
      await page.goto("/custo-da-hora");
      await row.state.drive(page);

      const grossSalaryBannerTitle = page.getByText("Informe o seu salário bruto");
      const grossSalarySeeded = row.condition.seed.some((entry) => entry.name === GROSS_SALARY_KEY);
      if (grossSalarySeeded) {
        await expect(grossSalaryBannerTitle).toHaveCount(0);
      } else {
        await expect(grossSalaryBannerTitle).toBeVisible();
      }

      const measurement = await page.evaluate(() => {
        const disclosureTop = document.getElementById("divisor-disclosure")?.getBoundingClientRect().top ?? null;
        const bannerTop = document.getElementById("divisor-alert")?.getBoundingClientRect().top ?? null;
        const grossSalaryBanner = document.querySelector('#salary-panel > [role="alert"]:not([id])');
        const grossSalaryBannerHeight = grossSalaryBanner ? grossSalaryBanner.getBoundingClientRect().height : null;
        const grossSalaryBannerMarginBottom = grossSalaryBanner
          ? Number.parseFloat(getComputedStyle(grossSalaryBanner).marginBottom)
          : null;
        return {
          disclosureTop,
          bannerTop,
          grossSalaryBannerHeight,
          grossSalaryBannerMarginBottom,
          scrollY: window.scrollY,
        };
      });

      const documentDisclosureTop =
        measurement.disclosureTop === null ? null : measurement.disclosureTop + measurement.scrollY;
      const documentBannerTop = measurement.bannerTop === null ? null : measurement.bannerTop + measurement.scrollY;
      const margin =
        documentDisclosureTop !== null && documentBannerTop !== null ? documentBannerTop - documentDisclosureTop : null;
      const grossSalaryBanner =
        measurement.grossSalaryBannerHeight === null || measurement.grossSalaryBannerMarginBottom === null
          ? "absent"
          : `${measurement.grossSalaryBannerHeight} + ${measurement.grossSalaryBannerMarginBottom} mb-6`;

      lines.push(
        `${row.condition.name} ${row.theme} ${row.state.name} 390x844: divisor-disclosure top=${documentDisclosureTop ?? "n/a"}, divisor-alert top=${documentBannerTop ?? "n/a"}, margin=${margin ?? "n/a"}, salario-bruto banner=${grossSalaryBanner}`,
      );

      await context.close();
    }

    const evidenceDirectory = join(process.cwd(), ".specs/0007-sumula-431-citation-scope/evidence");
    await mkdir(evidenceDirectory, { recursive: true });
    await writeFile(join(evidenceDirectory, "clause-2d.txt"), `${lines.join("\n")}\n`, "utf8");
  });
});
