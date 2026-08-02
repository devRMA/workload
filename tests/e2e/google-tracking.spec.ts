import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Google Tracking & Ads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show cookie consent banner on first visit", async ({ page }) => {
    await expect(page.locator("text=Respeitamos sua privacidade")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should allow accepting cookies and load GA script", async ({ page }) => {
    await page.click('button:has-text("Aceitar Tudo")');
    await expect(page.locator("text=Respeitamos sua privacidade")).not.toBeVisible();

    const gaScript = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    await expect(gaScript).toHaveCount(1);
  });

  test("should show side ads on desktop after delay", async ({ page }) => {
    const viewport = page.viewportSize();
    test.skip(!viewport || viewport.width < 1536, "side ads only render from the 2xl breakpoint up");

    await page.click('button:has-text("Aceitar Tudo")');

    const sideAd = page.locator("text=Espaço do Apoiador").first();
    await expect(sideAd).toBeVisible({ timeout: 10000 });
  });

  test("should hide consent banner after choice", async ({ page }) => {
    await page.click('button:has-text("Aceitar Tudo")');
    await expect(page.locator('button:has-text("Aceitar Tudo")')).toHaveCount(0);
  });
});
