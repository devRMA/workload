import { type ElementHandle, expect, type Locator, type Page, test } from "@playwright/test";
import { CURRENT_LEGAL_YEAR } from "../../lib/legal-tables";
import { DS4_PANEL_SELECTOR, waitForStableBoundingBox } from "./support/legibility";
import {
  answerPanelLines,
  type Box,
  citationParagraph,
  clearConsent,
  clearingScrollRanges,
  EXPECTED_LINES_ON_FIRST_SCREEN,
  EXPECTED_LR35_SURFACE_COUNT,
  EXPECTED_LR42A_CONTROL_COUNT,
  type FixedBox,
  fixedBoxes,
  intersects,
  LR42A_VIEWPORTS,
  REACHABILITY_VIEWPORT,
  ROUTES,
  type ScrollRange,
  STORAGE_STATES,
  seedStorage,
  THEMES,
} from "./support/reachability";

const CONSENT_STORAGE_KEY = "workload_cookie_consent";
const ANSWERED_CONSENT_RECORD = JSON.stringify({ telemetry: true, timestamp: 0 });

const LR35_SURFACE_MARKERS: Record<(typeof ROUTES)[number], Record<string, string>> = {
  "/": {
    "DS1 P1": "Tudo o que você digita fica salvo apenas neste navegador",
    "DS1 P2": "Os valores são uma estimativa para você se organizar",
    "DS1 P3": "Não entram na conta: FGTS",
    "DS1 P4": CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm,
  },
  "/custo-da-hora": {
    "DS1 P1": "Tudo o que você digita fica salvo apenas neste navegador",
    "DS1 P2": "Os valores são uma estimativa para você se organizar",
    "DS1 P3": "Não entram na conta: FGTS",
    "DS1 P4": CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm,
  },
};

const FULL_JOURNEY_SURFACE_MARKERS: Record<string, string> = {
  ...LR35_SURFACE_MARKERS["/"],
  DS2: "Súmula 172",
  "DS7 art. 59": "O art. 59 da CLT limita",
  "DS7 art. 71": "Seu intervalo ficou abaixo",
};

const LR35_SWEEP_STORAGE_STATES = ["empty", "seeded"] as const;
const LR42A_NEAR_BOTTOM_WINDOW_PX = 100;

function rectFromBoundingBox(box: { x: number; y: number; width: number; height: number }): Box {
  return {
    top: box.y,
    bottom: box.y + box.height,
    left: box.x,
    right: box.x + box.width,
    width: box.width,
    height: box.height,
  };
}

function consentSurface(page: Page): Locator {
  return page
    .locator("div")
    .filter({ has: page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" }) })
    .filter({ has: page.getByRole("button", { name: "Aceitar Tudo" }) })
    .first();
}

async function seedFullJourneyOvertime(page: Page): Promise<void> {
  await page.goto("/", { waitUntil: "load" });
  await page.evaluate(() => {
    const pad = (value: number) => String(value).padStart(2, "0");
    const at = (hours: number, minutes: number) => {
      const now = new Date();
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(hours)}:${pad(minutes)}`;
    };
    localStorage.setItem("grossSalary", "4200");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "528");
    localStorage.setItem("entry", at(8, 0));
    localStorage.setItem("lunchStart", at(12, 0));
    localStorage.setItem("lunchEnd", at(12, 30));
    localStorage.setItem("exitOverride", at(19, 30));
    localStorage.setItem("isManualExit", "true");
  });
  await page.goto("/", { waitUntil: "load" });
}

async function lr35Surface(
  page: Page,
  marker: string,
  expectedSurface: ElementHandle<Element> | null = null,
): Promise<{
  found: boolean;
  ranges: ScrollRange[];
  containmentOnly: ScrollRange[];
  chromeExcludedSomething: boolean;
  widestRange: number;
  matchesExpectedSurface: boolean;
  surfaceTag: string;
  surfaceDisplay: string;
  surfaceHeight: number;
  leafTag: string;
  leafHeight: number;
  docTop: number;
  height: number;
  left: number;
  right: number;
  viewportHeight: number;
  maxScroll: number;
  fixed: FixedBox[];
  stickyCount: number;
  lowFixedCount: number;
}> {
  const geometry = await page.evaluate(
    ({ markerText, expected }) => {
      const all = [...document.querySelectorAll("body *")];
      const leaf = all.find(
        (element) =>
          (element.textContent ?? "").includes(markerText) &&
          ![...element.children].some((child) => (child.textContent ?? "").includes(markerText)),
      );
      if (!leaf) throw new Error(`surface not rendered: ${markerText}`);

      const isInlineLevel = (element: Element) => {
        const display = getComputedStyle(element).display;
        return display === "contents" || display.startsWith("inline");
      };
      let surface: Element = leaf;
      while (isInlineLevel(surface) && surface.parentElement) surface = surface.parentElement;

      const round = (value: number) => Math.round(value * 10) / 10;
      const rect = surface.getBoundingClientRect();

      const fixed = all
        .filter((element) => {
          const style = getComputedStyle(element);
          return (
            (style.position === "fixed" || style.position === "sticky") &&
            element.getBoundingClientRect().height > 0 &&
            !element.contains(surface) &&
            !surface.contains(element)
          );
        })
        .map((element) => {
          const box = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            position: getComputedStyle(element).position,
            label: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30),
            top: round(box.top),
            bottom: round(box.bottom),
            left: round(box.left),
            right: round(box.right),
            width: round(box.width),
            height: round(box.height),
          };
        });

      return {
        matchesExpectedSurface: expected === null || surface === expected,
        surfaceTag: surface.tagName.toLowerCase(),
        surfaceDisplay: getComputedStyle(surface).display,
        surfaceHeight: round(rect.height),
        leafTag: leaf.tagName.toLowerCase(),
        leafHeight: round(leaf.getBoundingClientRect().height),
        docTop: round(rect.top + scrollY),
        height: round(rect.height),
        left: round(rect.left),
        right: round(rect.right),
        viewportHeight: innerHeight,
        maxScroll: round(document.documentElement.scrollHeight - innerHeight),
        fixed,
      };
    },
    { markerText: marker, expected: expectedSurface },
  );

  const ranges = clearingScrollRanges({ ...geometry, fixed: geometry.fixed });
  const containmentOnly = clearingScrollRanges({ ...geometry, fixed: [] });
  return {
    ...geometry,
    ranges,
    containmentOnly,
    found: ranges.length > 0,
    chromeExcludedSomething: JSON.stringify(ranges) !== JSON.stringify(containmentOnly),
    widestRange: ranges.reduce((widest, range) => Math.max(widest, range.to - range.from), 0),
    stickyCount: geometry.fixed.filter((box) => box.position === "sticky").length,
    lowFixedCount: geometry.fixed.filter((box) => box.top >= geometry.viewportHeight / 2).length,
  };
}

async function consentControlViolations(
  surface: Locator,
  controls: Record<string, Locator>,
  fixed: FixedBox[],
  viewport: { width: number; height: number },
): Promise<string[]> {
  const violations: string[] = [];
  const surfaceBox = await surface.boundingBox();
  if (!surfaceBox) return ["surface has no bounding box"];
  const surfaceRect = rectFromBoundingBox(surfaceBox);

  if (fixed.some((box) => intersects(surfaceRect, box))) violations.push("surface intersects fixed chrome");

  for (const [name, control] of Object.entries(controls)) {
    const controlBox = await control.boundingBox();
    if (!controlBox) {
      violations.push(`${name} has no bounding box`);
      continue;
    }
    const controlRect = rectFromBoundingBox(controlBox);

    const insideViewport =
      controlRect.top >= 0 &&
      controlRect.bottom <= viewport.height &&
      controlRect.left >= 0 &&
      controlRect.right <= viewport.width;
    if (!insideViewport) violations.push(`${name} is outside the viewport`);

    const insideSurface =
      controlRect.top >= surfaceRect.top - 0.5 &&
      controlRect.bottom <= surfaceRect.bottom + 0.5 &&
      controlRect.left >= surfaceRect.left - 0.5 &&
      controlRect.right <= surfaceRect.right + 0.5;
    if (!insideSurface) violations.push(`${name} is outside the surface`);

    const scrollWidth = await control.evaluate((element) => element.scrollWidth);
    if (scrollWidth > Math.ceil(controlRect.width)) violations.push(`${name} text is clipped`);

    if (fixed.some((box) => intersects(controlRect, box))) violations.push(`${name} intersects fixed chrome`);
  }

  return violations;
}

async function findScrollYWithoutConsentViolations(
  page: Page,
  surface: Locator,
  controls: Record<string, Locator>,
  viewport: { width: number; height: number },
  sampleCount: number,
): Promise<{ scrollY: number; violations: string[] }> {
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const windowStart = sampleCount === 1 ? maxScroll : Math.max(0, maxScroll - LR42A_NEAR_BOTTOM_WINDOW_PX);
  const targets =
    sampleCount === 1
      ? [maxScroll]
      : Array.from(
          { length: sampleCount },
          (_, index) => windowStart + ((maxScroll - windowStart) * index) / (sampleCount - 1),
        );

  let lastAttempt: { scrollY: number; violations: string[] } = {
    scrollY: 0,
    violations: ["no scroll position sampled"],
  };
  for (const target of targets) {
    await page.evaluate((value) => window.scrollTo(0, value), target);
    await waitForStableBoundingBox(surface);
    const fixed = await fixedBoxes(page);
    const violations = await consentControlViolations(surface, controls, fixed, viewport);
    const scrollY = await page.evaluate(() => window.scrollY);
    lastAttempt = { scrollY, violations };
    if (violations.length === 0) return lastAttempt;
  }
  return lastAttempt;
}

test.describe("AC1 / R — a disclosure surface is reachable on the first screen", () => {
  for (const route of ROUTES) {
    for (const state of STORAGE_STATES) {
      for (const theme of THEMES) {
        test(`the table citation is reachable at ${route} ${state} ${theme}`, async ({ page }) => {
          await page.setViewportSize(REACHABILITY_VIEWPORT);
          await page.emulateMedia({ colorScheme: theme });
          await clearConsent(page);
          await seedStorage(page, route, state);

          const citation = citationParagraph(page);
          await expect(citation).toHaveCount(1);
          await waitForStableBoundingBox(citation);

          const citationBox = await citation.boundingBox();
          if (!citationBox) throw new Error("citation has no bounding box");
          const citationRect = rectFromBoundingBox(citationBox);

          expect(citationRect.top, "clause 1 — citation top outside the first viewport").toBeGreaterThanOrEqual(0);
          expect(citationRect.bottom, "clause 1 — citation bottom outside the first viewport").toBeLessThanOrEqual(
            REACHABILITY_VIEWPORT.height,
          );
          expect(citationRect.left, "clause 1 — citation left outside the first viewport").toBeGreaterThanOrEqual(0);
          expect(citationRect.right, "clause 1 — citation right outside the first viewport").toBeLessThanOrEqual(
            REACHABILITY_VIEWPORT.width,
          );

          const fixed = await fixedBoxes(page);
          const offenders = fixed.filter((box) => intersects(citationRect, box));
          expect(offenders, `clause 2 — citation is concealed by: ${JSON.stringify(offenders)}`).toEqual([]);

          const heroValue = page.locator('p[aria-live="polite"]:not(.sr-only)');
          await expect(heroValue).toHaveCount(1);
          const heroValueBox = await heroValue.boundingBox();
          if (!heroValueBox) throw new Error("hero value has no bounding box");
          const heroValueRect = rectFromBoundingBox(heroValueBox);

          expect(
            heroValueRect.top,
            "clause 3 — the claim the citation pairs with is off the first screen",
          ).toBeGreaterThanOrEqual(0);
          expect(
            heroValueRect.bottom,
            "clause 3 — the claim the citation pairs with is off the first screen",
          ).toBeLessThanOrEqual(REACHABILITY_VIEWPORT.height);
        });
      }
    }
  }
});

test.describe("AC13 / O — no rendered line of the answer is occluded", () => {
  for (const route of ROUTES) {
    for (const state of STORAGE_STATES) {
      for (const theme of THEMES) {
        test(`no answer line is occluded at ${route} ${state} ${theme}`, async ({ page }) => {
          await page.setViewportSize(REACHABILITY_VIEWPORT);
          await page.emulateMedia({ colorScheme: theme });
          await clearConsent(page);
          await seedStorage(page, route, state);
          await expect(citationParagraph(page)).toHaveCount(1);

          const lines = await answerPanelLines(page, route);
          const expected = EXPECTED_LINES_ON_FIRST_SCREEN[route as (typeof ROUTES)[number]];
          const sighted = lines.filter((line) => !line.assistiveOnly).length;
          const assistive = lines.filter((line) => line.assistiveOnly).length;

          expect(
            { sighted, assistive, total: lines.length },
            `expected ${expected.sighted} sighted + ${expected.assistive} assistive`,
          ).toEqual({
            sighted: expected.sighted,
            assistive: expected.assistive,
            total: expected.sighted + expected.assistive,
          });

          const occluded = lines.filter((line) => line.occludedBy.length > 0);
          expect(occluded, `occluded lines: ${JSON.stringify(occluded)}`).toEqual([]);
        });
      }
    }
  }
});

test.describe("LR3.5 — every disclosure surface has a scroll position clear of the fixed chrome", () => {
  for (const route of ROUTES) {
    for (const state of LR35_SWEEP_STORAGE_STATES) {
      for (const theme of THEMES) {
        test(`sweeps every surface at ${route} ${state} ${theme}, consent pending`, async ({ page }) => {
          await page.setViewportSize(REACHABILITY_VIEWPORT);
          await page.emulateMedia({ colorScheme: theme });
          await clearConsent(page);
          await seedStorage(page, route, state);
          await expect(citationParagraph(page)).toHaveCount(1);

          const markers = LR35_SURFACE_MARKERS[route];
          for (const [surfaceName, marker] of Object.entries(markers)) {
            await expect(page.getByText(marker), `marker ${surfaceName} no longer matches any element`).toHaveCount(1);
          }
          expect(Object.keys(markers)).toHaveLength(EXPECTED_LR35_SURFACE_COUNT[route]);

          for (const [surfaceName, marker] of Object.entries(markers)) {
            const expectedSurface = surfaceName === "DS1 P4" ? await citationParagraph(page).elementHandle() : null;
            const result = await lr35Surface(page, marker, expectedSurface);
            expect(
              result.matchesExpectedSurface,
              `guard defect: LR3.5's ${surfaceName} surface at ${route} resolved to <${result.surfaceTag}> (h ${result.surfaceHeight}), not the element citationParagraph resolves to`,
            ).toBe(true);
            expect(
              result.surfaceDisplay === "contents" || result.surfaceDisplay.startsWith("inline"),
              `guard defect: LR3.5's ${surfaceName} surface is inline-level (<${result.surfaceTag}>, display ${result.surfaceDisplay}); it measures a fragment, not the disclosure`,
            ).toBe(false);
            expect(
              result.surfaceHeight >= result.leafHeight,
              `guard defect: LR3.5's ${surfaceName} surface (<${result.surfaceTag}>, h ${result.surfaceHeight}) is smaller than its matched leaf (<${result.leafTag}>, h ${result.leafHeight})`,
            ).toBe(true);
            expect(
              result.stickyCount,
              `guard defect: ${result.stickyCount} sticky element(s) in the fixed set at ${route}; a sticky box's viewport rect is only valid at the scroll it was read at, and this predicate assumes viewport-anchored boxes`,
            ).toBe(0);
            expect(
              result.lowFixedCount,
              `guard defect: no fixed element in the bottom half of the viewport at ${route} ${state} ${theme}; LR3.5 is vacuous in a cell with no bottom chrome (fixed set: ${JSON.stringify(result.fixed)})`,
            ).toBeGreaterThan(0);
            expect(
              result.chromeExcludedSomething || result.ranges.length === 0,
              `guard defect: fixed chrome excluded no scroll position for ${surfaceName} at ${route} ${state} ${theme}; the clearing set equals the bare containment interval ${JSON.stringify(result.containmentOnly)}`,
            ).toBe(true);
            expect(
              result.found,
              `${surfaceName} at ${route} ${state} ${theme} has no scroll position where its whole border box is in the viewport and clear of fixed chrome (docTop ${result.docTop}, h ${result.surfaceHeight}, viewport ${result.viewportHeight}, maxScroll ${result.maxScroll}, containment ${JSON.stringify(result.containmentOnly)}, after chrome ${JSON.stringify(result.ranges)})`,
            ).toBe(true);
          }
        });

        test(`sweeps every surface at ${route} ${state} ${theme}, consent answered`, async ({ page }) => {
          await page.setViewportSize(REACHABILITY_VIEWPORT);
          await page.emulateMedia({ colorScheme: theme });
          await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
            key: CONSENT_STORAGE_KEY,
            value: ANSWERED_CONSENT_RECORD,
          });
          await seedStorage(page, route, state);
          await expect(citationParagraph(page)).toHaveCount(1);

          const markers = LR35_SURFACE_MARKERS[route];
          for (const [surfaceName, marker] of Object.entries(markers)) {
            await expect(page.getByText(marker), `marker ${surfaceName} no longer matches any element`).toHaveCount(1);
          }
          expect(Object.keys(markers)).toHaveLength(EXPECTED_LR35_SURFACE_COUNT[route]);

          for (const [surfaceName, marker] of Object.entries(markers)) {
            const expectedSurface = surfaceName === "DS1 P4" ? await citationParagraph(page).elementHandle() : null;
            const result = await lr35Surface(page, marker, expectedSurface);
            expect(
              result.matchesExpectedSurface,
              `guard defect: LR3.5's ${surfaceName} surface at ${route} resolved to <${result.surfaceTag}> (h ${result.surfaceHeight}), not the element citationParagraph resolves to`,
            ).toBe(true);
            expect(
              result.surfaceDisplay === "contents" || result.surfaceDisplay.startsWith("inline"),
              `guard defect: LR3.5's ${surfaceName} surface is inline-level (<${result.surfaceTag}>, display ${result.surfaceDisplay}); it measures a fragment, not the disclosure`,
            ).toBe(false);
            expect(
              result.surfaceHeight >= result.leafHeight,
              `guard defect: LR3.5's ${surfaceName} surface (<${result.surfaceTag}>, h ${result.surfaceHeight}) is smaller than its matched leaf (<${result.leafTag}>, h ${result.leafHeight})`,
            ).toBe(true);
            expect(
              result.stickyCount,
              `guard defect: ${result.stickyCount} sticky element(s) in the fixed set at ${route}; a sticky box's viewport rect is only valid at the scroll it was read at, and this predicate assumes viewport-anchored boxes`,
            ).toBe(0);
            expect(
              result.lowFixedCount,
              `guard defect: no fixed element in the bottom half of the viewport at ${route} ${state} ${theme}; LR3.5 is vacuous in a cell with no bottom chrome (fixed set: ${JSON.stringify(result.fixed)})`,
            ).toBeGreaterThan(0);
            expect(
              result.chromeExcludedSomething || result.ranges.length === 0,
              `guard defect: fixed chrome excluded no scroll position for ${surfaceName} at ${route} ${state} ${theme}; the clearing set equals the bare containment interval ${JSON.stringify(result.containmentOnly)}`,
            ).toBe(true);
            expect(
              result.found,
              `${surfaceName} at ${route} ${state} ${theme} (consent answered) has no scroll position where its whole border box is in the viewport and clear of fixed chrome (docTop ${result.docTop}, h ${result.surfaceHeight}, viewport ${result.viewportHeight}, maxScroll ${result.maxScroll}, containment ${JSON.stringify(result.containmentOnly)}, after chrome ${JSON.stringify(result.ranges)})`,
            ).toBe(true);
          }
        });
      }
    }
  }

  test("sweeps every surface across a full journey on / with an explicit count of 7", async ({ page }) => {
    await page.setViewportSize(REACHABILITY_VIEWPORT);
    await clearConsent(page);
    await seedFullJourneyOvertime(page);
    await expect(citationParagraph(page)).toHaveCount(1);

    for (const [surfaceName, marker] of Object.entries(FULL_JOURNEY_SURFACE_MARKERS)) {
      await expect(page.getByText(marker), `marker ${surfaceName} no longer matches any element`).toHaveCount(1);
    }
    expect(Object.keys(FULL_JOURNEY_SURFACE_MARKERS)).toHaveLength(7);

    for (const [surfaceName, marker] of Object.entries(FULL_JOURNEY_SURFACE_MARKERS)) {
      const expectedSurface = surfaceName === "DS1 P4" ? await citationParagraph(page).elementHandle() : null;
      const result = await lr35Surface(page, marker, expectedSurface);
      expect(
        result.matchesExpectedSurface,
        `guard defect: LR3.5's ${surfaceName} surface at / resolved to <${result.surfaceTag}> (h ${result.surfaceHeight}), not the element citationParagraph resolves to`,
      ).toBe(true);
      expect(
        result.surfaceDisplay === "contents" || result.surfaceDisplay.startsWith("inline"),
        `guard defect: LR3.5's ${surfaceName} surface is inline-level (<${result.surfaceTag}>, display ${result.surfaceDisplay}); it measures a fragment, not the disclosure`,
      ).toBe(false);
      expect(
        result.surfaceHeight >= result.leafHeight,
        `guard defect: LR3.5's ${surfaceName} surface (<${result.surfaceTag}>, h ${result.surfaceHeight}) is smaller than its matched leaf (<${result.leafTag}>, h ${result.leafHeight})`,
      ).toBe(true);
      expect(
        result.stickyCount,
        `guard defect: ${result.stickyCount} sticky element(s) in the fixed set at /; a sticky box's viewport rect is only valid at the scroll it was read at, and this predicate assumes viewport-anchored boxes`,
      ).toBe(0);
      expect(
        result.lowFixedCount,
        `guard defect: no fixed element in the bottom half of the viewport across the full journey on /; LR3.5 is vacuous in a cell with no bottom chrome (fixed set: ${JSON.stringify(result.fixed)})`,
      ).toBeGreaterThan(0);
      expect(
        result.chromeExcludedSomething || result.ranges.length === 0,
        `guard defect: fixed chrome excluded no scroll position for ${surfaceName} across the full journey on /; the clearing set equals the bare containment interval ${JSON.stringify(result.containmentOnly)}`,
      ).toBe(true);
      expect(
        result.found,
        `${surfaceName} across the full journey on / has no scroll position where its whole border box is in the viewport and clear of fixed chrome (docTop ${result.docTop}, h ${result.surfaceHeight}, viewport ${result.viewportHeight}, maxScroll ${result.maxScroll}, containment ${JSON.stringify(result.containmentOnly)}, after chrome ${JSON.stringify(result.ranges)})`,
      ).toBe(true);
    }
  });
});

test.describe("LR4.2a — one scroll position serves every consent control at once", () => {
  for (const viewport of LR42A_VIEWPORTS) {
    for (const theme of THEMES) {
      test(`serves every consent control from one scroll position at ${viewport.width}x${viewport.height} ${theme}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: theme });
        await clearConsent(page);
        await page.goto("/", { waitUntil: "load" });
        await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible();

        const firstLevelControls: Record<string, Locator> = {
          Configurar: page.getByRole("button", { name: "Configurar" }),
          Recusar: page.getByRole("button", { name: "Recusar" }),
          "Aceitar Tudo": page.getByRole("button", { name: "Aceitar Tudo" }),
        };
        for (const control of Object.values(firstLevelControls)) await expect(control).toHaveCount(1);

        await page.getByRole("button", { name: "Configurar" }).click();
        const dialog = page.locator(DS4_PANEL_SELECTOR);
        await expect(dialog).toBeVisible();

        const secondLevelControls: Record<string, Locator> = {
          "Fechar configurações de privacidade": page.getByRole("button", {
            name: "Fechar configurações de privacidade",
          }),
          "Telemetria (Google Analytics)": page.getByRole("switch"),
          "Salvar Preferências": page.getByRole("button", { name: "Salvar Preferências" }),
        };
        for (const control of Object.values(secondLevelControls)) await expect(control).toHaveCount(1);

        expect(Object.keys(firstLevelControls).length + Object.keys(secondLevelControls).length).toBe(
          EXPECTED_LR42A_CONTROL_COUNT,
        );

        await page.getByRole("button", { name: "Fechar configurações de privacidade" }).click();
        await expect(dialog).not.toBeVisible();

        const sampleCount = viewport.width === 1440 ? 21 : 1;
        const surface = consentSurface(page);

        const firstLevelResult = await findScrollYWithoutConsentViolations(
          page,
          surface,
          firstLevelControls,
          viewport,
          sampleCount,
        );
        expect(
          firstLevelResult.violations,
          `first level at scrollY ${firstLevelResult.scrollY}: ${JSON.stringify(firstLevelResult.violations)}`,
        ).toEqual([]);

        await page.getByRole("button", { name: "Configurar" }).click();
        await expect(dialog).toBeVisible();
        await waitForStableBoundingBox(dialog);

        const secondLevelResult = await findScrollYWithoutConsentViolations(
          page,
          dialog,
          secondLevelControls,
          viewport,
          sampleCount,
        );
        expect(
          secondLevelResult.violations,
          `second level at scrollY ${secondLevelResult.scrollY}: ${JSON.stringify(secondLevelResult.violations)}`,
        ).toEqual([]);
      });

      const isKnownFailing = viewport.width === 1440;
      const lr44Clause2Title = isKnownFailing
        ? `F2c — area(Recusar) is smaller than area(Aceitar Tudo) at ${viewport.width}x${viewport.height} ${theme}`
        : `LR4.4 clause 2 — area(Recusar) matches area(Aceitar Tudo) at ${viewport.width}x${viewport.height} ${theme}`;

      test(lr44Clause2Title, async ({ page }, testInfo) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: theme });
        await clearConsent(page);
        await page.goto("/", { waitUntil: "load" });
        await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible();

        const acceptBox = await page.getByRole("button", { name: "Aceitar Tudo" }).boundingBox();
        const refuseBox = await page.getByRole("button", { name: "Recusar" }).boundingBox();
        if (!acceptBox || !refuseBox) throw new Error("LR4.4 clause 2 needs both button boxes");

        const acceptArea = acceptBox.width * acceptBox.height;
        const refuseArea = refuseBox.width * refuseBox.height;
        testInfo.annotations.push({
          type: "lr44-clause-2",
          description: `${viewport.width}x${viewport.height} ${theme} — area(Recusar) ${refuseArea} vs area(Aceitar Tudo) ${acceptArea}`,
        });

        if (isKnownFailing) {
          test.fixme(true, `F2c — area(Recusar) ${refuseArea} < area(Aceitar Tudo) ${acceptArea}`);
        }

        expect(refuseArea).toBe(acceptArea);
      });
    }
  }
});
