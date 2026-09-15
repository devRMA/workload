import { expect, type Locator, type Page, test } from "@playwright/test";

const ROUTES = ["/", "/custo-da-hora"] as const;
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

const DS1_FOOTER_SELECTOR = "#main-content > footer";
const DS4_PANEL_SELECTOR = "dialog[aria-labelledby='privacy-settings-title'] > div";

async function availableContentWidth(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    const parent = element.parentElement;
    if (!parent) throw new Error("disclosure surface has no parent to measure against");
    const style = getComputedStyle(parent);
    return parent.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
  });
}

async function lineBoxesAndCharacters(locator: Locator): Promise<{ lineBoxes: number; characters: number }> {
  return locator.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const tops = new Set(Array.from(range.getClientRects()).map((rect) => Math.round(rect.top)));
    return { lineBoxes: tops.size, characters: element.textContent?.trim().length ?? 0 };
  });
}

async function assertLr2(locator: Locator) {
  const { lineBoxes, characters } = await lineBoxesAndCharacters(locator);
  if (lineBoxes > 1) {
    expect(characters / lineBoxes).toBeGreaterThanOrEqual(40);
  }
}

async function assertLr1(locator: Locator) {
  const width = (await locator.boundingBox())?.width ?? 0;
  const available = await availableContentWidth(locator);
  expect(width).toBeGreaterThanOrEqual(Math.min(320, available));
}

async function assertLr3(page: Page, route: string, locator: Locator, serverRenderedMarker: string) {
  const serverHtml = await (await page.request.get(route)).text();
  expect(serverHtml).toContain(serverRenderedMarker);

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

async function waitForStableBoundingBox(locator: Locator) {
  const STABLE_READS_REQUIRED = 3;
  const POLL_INTERVAL_MS = 40;
  const MAX_POLLS = 25;

  let previousWidth: number | null = null;
  let stableReads = 0;

  for (let poll = 0; poll < MAX_POLLS && stableReads < STABLE_READS_REQUIRED; poll += 1) {
    const width = (await locator.boundingBox())?.width ?? 0;
    if (previousWidth !== null && Math.abs(width - previousWidth) < 0.01) {
      stableReads += 1;
    } else {
      stableReads = 0;
    }
    previousWidth = width;
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

async function openPrivacySettings(page: Page, route: string) {
  await page.addInitScript(() => localStorage.removeItem("workload_cookie_consent"));
  await page.goto(route);
  await page.getByRole("button", { name: "Configurar" }).click();
  const panel = page.locator(DS4_PANEL_SELECTOR);
  await expect(panel).toBeVisible();
  await waitForStableBoundingBox(panel);
}

test.describe("Disclosure legibility — DS1, the legal footer", () => {
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`footer stays legible at ${route} ${viewport.width}x${viewport.height} ${theme}`, async ({ page }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme: theme });
          await page.goto(route);

          const footer = page.locator(DS1_FOOTER_SELECTOR);
          await expect(footer).toBeVisible();

          await assertLr1(footer);
          await assertLr2(footer);
          await assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador");

          const paragraphs = await footer.locator("p").all();
          for (const paragraph of paragraphs) {
            await assertLr2(paragraph);
          }
        });
      }
    }
  }
});

test.describe("Disclosure legibility — DS4, the privacy settings dialog", () => {
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`settings dialog stays legible and operable at ${route} ${viewport.width}x${viewport.height} ${theme}`, async ({
          page,
        }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme: theme });
          await openPrivacySettings(page, route);

          const panel = page.locator(DS4_PANEL_SELECTOR);

          await assertLr1(panel);
          await assertLr3(page, route, panel, 'aria-labelledby="privacy-settings-title"');

          const captions = await panel.locator("p.text-caption").all();
          for (const caption of captions) {
            await assertLr2(caption);
          }

          const panelWidth = (await panel.boundingBox())?.width ?? 0;
          expect(panelWidth).toBeGreaterThanOrEqual(Math.min(480, viewport.width - 32));

          const panelBox = await panel.boundingBox();
          if (!panelBox) throw new Error("panel has no bounding box");

          const controls = [
            page.getByRole("switch", { name: "Telemetria (Google Analytics)" }),
            page.getByRole("button", { name: "Salvar Preferências" }),
            page.getByRole("button", { name: "Fechar configurações de privacidade" }),
          ];

          for (const control of controls) {
            await expect(control).toBeVisible();

            const controlBox = await control.boundingBox();
            if (!controlBox) throw new Error("control has no bounding box");

            expect(controlBox.x).toBeGreaterThanOrEqual(0);
            expect(controlBox.y).toBeGreaterThanOrEqual(0);
            expect(controlBox.x + controlBox.width).toBeLessThanOrEqual(viewport.width);
            expect(controlBox.y + controlBox.height).toBeLessThanOrEqual(viewport.height);

            expect(controlBox.x).toBeGreaterThanOrEqual(panelBox.x - 0.5);
            expect(controlBox.y).toBeGreaterThanOrEqual(panelBox.y - 0.5);
            expect(controlBox.x + controlBox.width).toBeLessThanOrEqual(panelBox.x + panelBox.width + 0.5);
            expect(controlBox.y + controlBox.height).toBeLessThanOrEqual(panelBox.y + panelBox.height + 0.5);
          }
        });
      }
    }
  }
});
