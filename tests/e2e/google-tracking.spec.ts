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

  test("should never place an ad above the calculator", async ({ page }) => {
    await page.click('button:has-text("Aceitar Tudo")');

    await expect(page.locator("ins.adsbygoogle").first()).toBeAttached();

    const adComesAfterTheAnswer = await page.evaluate(() => {
      const heading = [...document.querySelectorAll("h2")].find((node) => node.textContent?.includes("Sua Jornada"));
      const slot = document.querySelector("ins.adsbygoogle");
      if (!heading || !slot) return false;
      return (heading.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });

    expect(adComesAfterTheAnswer).toBe(true);
  });

  test("should hide consent banner after choice", async ({ page }) => {
    await page.click('button:has-text("Aceitar Tudo")');
    await expect(page.locator('button:has-text("Aceitar Tudo")')).toHaveCount(0);
  });
});
