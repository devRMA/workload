import { expect, type Locator, test } from "@playwright/test";
import {
  assertLr1,
  assertLr2b,
  assertLr2bAcrossParagraphs,
  assertLr3,
  assertLr3Rendering,
  D3_LEGEND_SELECTOR,
  D4_CAPTION_TEXT,
  D6_CAPTION_SELECTOR,
  DS1_EXPECTED_PARAGRAPHS,
  DS1_FOOTER_SELECTOR,
  DS4_EXPECTED_PARAGRAPHS,
  DS4_PANEL_SELECTOR,
  driveUntil,
  openPrivacySettings,
  waitForStableBoundingBox,
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

          await assertLr2bAcrossParagraphs(
            footer,
            route === "/" ? 5 : DS1_EXPECTED_PARAGRAPHS,
            `DS1 ${route} ${viewport.width}x${viewport.height} ${theme}`,
          );
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

          await assertLr2bAcrossParagraphs(
            panel,
            DS4_EXPECTED_PARAGRAPHS,
            `DS4 ${route} ${viewport.width}x${viewport.height} ${theme}`,
          );

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

test.describe("Disclosure legibility — the three captions added by 0003", () => {
  const D3_FIELDSET_WIDTH_PX: Record<390 | 1440, number> = { 390: 308.0, 1440: 667.33 };
  const D3_PERSISTENCE_WAIT_MS = 1000;

  async function readLegendPersistence(legend: Locator) {
    return legend.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      opacity: getComputedStyle(element).opacity,
    }));
  }

  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      test(`D3 legend survives the regime gesture and a reload at ${viewport.width}x${viewport.height} ${theme}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: theme });
        await page.goto("/custo-da-hora");

        const alterarButton = page.getByRole("button", { name: /Alterar|Fechar/ });
        await expect(alterarButton).toBeVisible();

        await alterarButton.click();
        await expect(alterarButton).toHaveAttribute("aria-expanded", "true");

        await page
          .getByRole("radio", { name: /Estatutário/ })
          .locator("..")
          .click();
        await expect(alterarButton).toHaveAttribute("aria-expanded", "false");

        const legend = page.locator(D3_LEGEND_SELECTOR);
        await page.waitForTimeout(D3_PERSISTENCE_WAIT_MS);
        const persistedBeforeReload = await readLegendPersistence(legend);
        expect(persistedBeforeReload.height).toBeGreaterThan(0);
        expect(persistedBeforeReload.opacity).toBe("1");

        await page.reload();
        await expect(legend).toBeVisible();
        const persistedAfterReload = await readLegendPersistence(legend);
        expect(persistedAfterReload.height).toBeGreaterThan(0);
        expect(persistedAfterReload.opacity).toBe("1");

        const fieldset = page.getByRole("group", { name: "Regime de Trabalho" });
        await waitForStableBoundingBox(fieldset);
        const fieldsetBox = await fieldset.boundingBox();
        if (!fieldsetBox) throw new Error("regime fieldset has no bounding box");
        expect(Math.abs(fieldsetBox.width - D3_FIELDSET_WIDTH_PX[viewport.width])).toBeLessThanOrEqual(0.5);

        await assertLr2b(legend);
        await assertLr3Rendering(legend);
      });
    }
  }

  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      test(`D4 caption qualifies the night floor with zero night minutes at ${viewport.width}x${viewport.height} ${theme}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: theme });
        await page.goto("/");

        const label = `D4 ${viewport.width}x${viewport.height} ${theme}`;
        await driveUntil(
          async () => {
            await page.getByRole("radio", { name: "MANUAL" }).check();
            const exit = page.getByLabel("Hora para Saída Real");
            await exit.fill("1800");
            await exit.blur();
          },
          async () => {
            const nightRow = page.getByText("Adicional noturno 20%").locator("..");
            return (await nightRow.innerText()).includes("0h 0m");
          },
          label,
        );

        const caption = page.getByText(D4_CAPTION_TEXT);
        await expect(caption).toBeVisible();
        await assertLr2b(caption);
        await assertLr3Rendering(caption);
      });
    }
  }

  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      test(`D6 caption discloses the Ano approximation and leaves with the period at ${viewport.width}x${viewport.height} ${theme}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: theme });
        await page.goto("/custo-da-hora");

        await page.getByLabel("Salário Bruto (R$)").fill("3000");
        await page.getByLabel("Carga Horária Mensal").fill("220");

        const anoRadio = page.getByRole("radio", { name: "Ano" });
        await anoRadio.locator("..").click();
        await expect(anoRadio).toBeChecked();

        const caption = page.locator(D6_CAPTION_SELECTOR);
        await expect(caption).toBeVisible();
        await assertLr2b(caption);
        await assertLr3Rendering(caption);

        const mesRadio = page.getByRole("radio", { name: "Mês" });
        await mesRadio.locator("..").click();
        await expect(mesRadio).toBeChecked();
        await expect(caption).toHaveCount(0);
      });
    }
  }
});
