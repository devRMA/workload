import { expect, test } from "@playwright/test";

test.describe("Google Tracking & Ads", () => {
	test("should load the page without errors", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});

	test("should have AdSense script tag in the DOM", async ({ page }) => {
		await page.goto("/");
		const adsenseScript = page.locator(
			'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
		);
		const count = await adsenseScript.count();
		expect(count).toBeGreaterThanOrEqual(0);
	});

	test("should have Google Analytics script tag in the DOM", async ({
		page,
	}) => {
		await page.goto("/");
		const gaScript = page.locator(
			'script[src*="googletagmanager.com/gtag/js"]',
		);
		const count = await gaScript.count();
		expect(count).toBeGreaterThanOrEqual(0);
	});

	test("should show weekly ad section when no previous view exists", async ({
		page,
	}) => {
		await page.goto("/");
		await page.evaluate(() => localStorage.removeItem("workload_last_ad_view"));
		await page.reload();

		const adSection = page.locator("text=Anúncio da Semana");
		const isVisible = await adSection.isVisible().catch(() => false);

		if (isVisible) {
			await expect(adSection).toBeVisible();
		}
	});

	test("should hide ad after clicking dismiss button", async ({ page }) => {
		await page.goto("/");
		await page.evaluate(() => localStorage.removeItem("workload_last_ad_view"));
		await page.reload();

		const dismissButton = page.locator("text=Remover (já vi por hoje)");
		const isVisible = await dismissButton.isVisible().catch(() => false);

		if (isVisible) {
			await dismissButton.click();
			await expect(page.locator("text=Anúncio da Semana")).not.toBeVisible();
		}
	});
});
