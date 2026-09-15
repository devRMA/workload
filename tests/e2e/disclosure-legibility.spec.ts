import { expect, test } from "@playwright/test";
import {
  assertLr1,
  assertLr2b,
  assertLr3,
  DS1_FOOTER_SELECTOR,
  DS4_PANEL_SELECTOR,
  openPrivacySettings,
} from "./support/legibility";

const ROUTES = ["/", "/custo-da-hora"] as const;
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

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
          await assertLr2b(footer);
          await assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador");

          const paragraphs = await footer.locator("p").all();
          for (const paragraph of paragraphs) {
            await assertLr2b(paragraph);
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
            await assertLr2b(caption);
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
