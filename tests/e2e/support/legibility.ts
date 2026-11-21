import { expect, type Locator, type Page } from "@playwright/test";
import { test } from "./fixtures";

export const LR2A_CHROME_BUDGET_PX = 32;
export const LR2B_MEASURE_FLOOR_CPL = 40;
export const DS1_EXPECTED_PARAGRAPHS = 3;
export const DS4_EXPECTED_PARAGRAPHS = 5;

export interface SurfaceMeasurement {
  surfaceRootWidth: number;
  bodyTextWidth: number;
  chromeSpend: number;
  characters: number;
  lineBoxes: number;
  charactersPerLineBox: number;
}

export const DS1_FOOTER_SELECTOR = "#main-content > footer";
export const DS4_PANEL_SELECTOR = "dialog[aria-labelledby='privacy-settings-title'] > div";
export const D3_LEGEND_SELECTOR = "#regime-federal-rpps-gap";
export const D4_CAPTION_TEXT = "Os 20% do adicional noturno são o mínimo da CLT";
export const D6_CAPTION_SELECTOR = "#annual-period-disclosure";

export async function availableContentWidth(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    const parent = element.parentElement;
    if (!parent) throw new Error("disclosure surface has no parent to measure against");
    const style = getComputedStyle(parent);
    return parent.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
  });
}

export async function lineBoxesAndCharacters(locator: Locator): Promise<{ lineBoxes: number; characters: number }> {
  return locator.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const tops = new Set(Array.from(range.getClientRects()).map((rect) => Math.round(rect.top)));
    return { lineBoxes: tops.size, characters: element.textContent?.trim().length ?? 0 };
  });
}

export async function assertLr2b(locator: Locator): Promise<"measured" | "exempt"> {
  const { lineBoxes, characters } = await lineBoxesAndCharacters(locator);
  if (lineBoxes === 1) return "exempt";

  expect(characters / lineBoxes).toBeGreaterThanOrEqual(LR2B_MEASURE_FLOOR_CPL);
  return "measured";
}

export async function assertLr2bAcrossParagraphs(surface: Locator, expectedParagraphs: number, label: string) {
  const paragraphs = await surface.locator("p").all();
  expect(
    paragraphs,
    `${label} — LG1.2: the surface rendered ${paragraphs.length} paragraphs, expected ${expectedParagraphs}`,
  ).toHaveLength(expectedParagraphs);

  let measured = 0;
  let exempt = 0;
  for (const paragraph of paragraphs) {
    if ((await assertLr2b(paragraph)) === "measured") {
      measured += 1;
    } else {
      exempt += 1;
    }
  }

  test.info().annotations.push({
    type: "lr2b-coverage",
    description: `${label} — measured ${measured} + exempt ${exempt} = ${expectedParagraphs}`,
  });
}

export async function assertLr1(locator: Locator) {
  await expect
    .poll(async () => {
      const width = await locator.evaluate((element) => element.getBoundingClientRect().width);
      const available = await availableContentWidth(locator);
      return width - Math.min(320, available);
    })
    .toBeGreaterThanOrEqual(0);
}

export async function assertLr3Rendering(locator: Locator) {
  const state = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      visibility: style.visibility,
      opacity: style.opacity,
      display: style.display,
      hidden: element.hasAttribute("hidden"),
      insideClosedDetails: element.closest("details:not([open])") !== null,
      insideCollapsedRegion: element.closest('[aria-expanded="false"]') !== null,
      onScreen: rect.right > 0 && rect.bottom > 0,
    };
  });

  expect(state.visibility).toBe("visible");
  expect(state.opacity).not.toBe("0");
  expect(state.display).not.toBe("none");
  expect(state.hidden).toBe(false);
  expect(state.insideClosedDetails).toBe(false);
  expect(state.insideCollapsedRegion).toBe(false);
  expect(state.onScreen).toBe(true);
}

export async function assertLr3(page: Page, route: string, locator: Locator, serverRenderedMarker: string) {
  const serverHtml = await (await page.request.get(route)).text();
  expect(serverHtml).toContain(serverRenderedMarker);

  await assertLr3Rendering(locator);
}

export async function waitForStableBoundingBox(locator: Locator) {
  const STABLE_READS_REQUIRED = 3;
  const POLL_INTERVAL_MS = 40;
  const MAX_POLLS = 25;

  let previous: Awaited<ReturnType<Locator["boundingBox"]>> = null;
  let stableReads = 0;

  for (let poll = 0; poll < MAX_POLLS && stableReads < STABLE_READS_REQUIRED; poll += 1) {
    const current = await locator.boundingBox();
    if (
      previous &&
      current &&
      Math.abs(current.x - previous.x) < 0.01 &&
      Math.abs(current.y - previous.y) < 0.01 &&
      Math.abs(current.width - previous.width) < 0.01 &&
      Math.abs(current.height - previous.height) < 0.01
    ) {
      stableReads += 1;
    } else {
      stableReads = 0;
    }
    previous = current;
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

export async function openPrivacySettings(page: Page, route: string) {
  await page.addInitScript(() => localStorage.removeItem("workload_cookie_consent"));
  await page.goto(route);
  await page.getByRole("button", { name: "Configurar" }).click();
  const panel = page.locator(DS4_PANEL_SELECTOR);
  await expect(panel).toBeVisible();
  await waitForStableBoundingBox(panel);
}

function roundedToTwoDecimals(value: number): number {
  return Number(value.toFixed(2));
}

export async function measureSurface(surfaceRoot: Locator, bodyText: Locator): Promise<SurfaceMeasurement> {
  const surfaceRootBox = await surfaceRoot.boundingBox();
  const bodyTextBox = await bodyText.boundingBox();
  if (!surfaceRootBox || !bodyTextBox) throw new Error("surface has no bounding box");

  const { lineBoxes, characters } = await lineBoxesAndCharacters(bodyText);

  const surfaceRootWidth = roundedToTwoDecimals(surfaceRootBox.width);
  const bodyTextWidth = roundedToTwoDecimals(bodyTextBox.width);
  const chromeSpend = roundedToTwoDecimals(surfaceRootWidth - bodyTextWidth);
  const charactersPerLineBox = roundedToTwoDecimals(lineBoxes === 0 ? 0 : characters / lineBoxes);

  return {
    surfaceRootWidth,
    bodyTextWidth,
    chromeSpend,
    characters: roundedToTwoDecimals(characters),
    lineBoxes: roundedToTwoDecimals(lineBoxes),
    charactersPerLineBox,
  };
}

export function expectLr2a(measurement: SurfaceMeasurement, label: string): void {
  expect(
    measurement.bodyTextWidth,
    `${label} — LR2a: bodyText ${measurement.bodyTextWidth} < surfaceRoot ${measurement.surfaceRootWidth} − ${LR2A_CHROME_BUDGET_PX}; chrome spend ${measurement.chromeSpend}, ${measurement.characters} chars over ${measurement.lineBoxes} line boxes = ${measurement.charactersPerLineBox} cpl`,
  ).toBeGreaterThanOrEqual(measurement.surfaceRootWidth - LR2A_CHROME_BUDGET_PX);
}

export async function driveUntil(
  drive: () => Promise<void>,
  settled: () => Promise<boolean>,
  label: string,
): Promise<void> {
  await expect
    .poll(
      async () => {
        await drive();
        return settled();
      },
      {
        message: `${label} — the drive never took effect; a controlled re-render is reverting it`,
        timeout: 20_000,
        intervals: [250, 500, 1000, 2000, 2000],
      },
    )
    .toBe(true);
}

export async function driveC5(page: Page): Promise<void> {
  await page.getByRole("radio", { name: "MANUAL" }).check();
  const exit = page.getByLabel("Hora para Saída Real");
  await exit.fill("2000");
  await exit.blur();
}
