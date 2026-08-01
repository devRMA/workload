import { expect, test } from "@playwright/test";

test.describe("Work Calculator (Jornada)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");

		const consentBanner = page.getByText("Respeitamos sua privacidade");
		if (await consentBanner.isVisible()) {
			await page.click('button:has-text("Aceitar Tudo")');
			await expect(consentBanner).not.toBeVisible();
		}

		await page.click('button:has-text("Jornada")');
	});

	test("should display default values correctly", async ({ page }) => {
		await expect(page.locator('h2:has-text("Sua Jornada")')).toBeVisible();
		await expect(page.locator('text="Entrada"')).toBeVisible();
		await expect(page.locator('text="Saída Almoço"')).toBeVisible();
		await expect(page.locator('text="Volta Almoço"')).toBeVisible();
	});

	test("should allow manual exit input", async ({ page }) => {
		await page.click('button:has-text("MANUAL")');
		await expect(page.locator('text="Saída Real"').first()).toBeVisible();
	});

	test("should open settings and update work minutes", async ({ page }) => {
		await page.getByLabel("Configurações da Jornada").click();
		await expect(
			page.locator('label:has-text("Tempo de Trabalho Diário")'),
		).toBeVisible();

		const journeyInput = page.locator("#daily-journey");
		await journeyInput.fill("0800");
		await journeyInput.blur();

		await expect(journeyInput).toHaveValue("08:00");
	});
});
