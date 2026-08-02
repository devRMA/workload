import { expect, test } from "@playwright/test";

test.describe("Work Calculator (Jornada)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Jornada" }).click();
  });

  test("should display default values correctly", async ({ page }) => {
    await expect(page.locator('h2:has-text("Sua Jornada")')).toBeVisible();
    await expect(page.locator('text="Entrada"')).toBeVisible();
    await expect(page.locator('text="Saída Almoço"')).toBeVisible();
    await expect(page.locator('text="Volta Almoço"')).toBeVisible();
  });

  test("should allow manual exit input", async ({ page }) => {
    await page.getByRole("radio", { name: "MANUAL" }).check();
    await expect(page.locator('text="Saída Real"').first()).toBeVisible();
  });

  test("should open settings and update work minutes", async ({ page }) => {
    await page.getByLabel("Configurações da Jornada").click();
    await expect(page.locator('label:has-text("Tempo de Trabalho Diário")')).toBeVisible();

    const journeyInput = page.locator("#daily-journey");
    await journeyInput.fill("0800");
    await journeyInput.blur();

    await expect(journeyInput).toHaveValue("08:00");
  });
});
