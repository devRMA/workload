import { expect, type Page, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

const CONSENT_STORAGE_KEY = "workload_cookie_consent";
const GOOGLE_HOST_PATTERN = /(^|\.)google-analytics\.com$|(^|\.)analytics\.google\.com$|(^|\.)googletagmanager\.com$/;

function isGoogleRequestUrl(url: string): boolean {
  return GOOGLE_HOST_PATTERN.test(new URL(url).host);
}

async function openSettingsPanel(page: Page): Promise<void> {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible();
  await page.getByRole("button", { name: "Configurar" }).click();
  await expect(page.getByRole("switch")).toBeVisible();
}

async function saveWithoutTouchingSwitch(page: Page): Promise<void> {
  await openSettingsPanel(page);
  await page.getByRole("button", { name: "Salvar Preferências" }).click();
}

async function readStoredTelemetry(page: Page): Promise<boolean | null> {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return (JSON.parse(raw) as { telemetry: boolean }).telemetry;
  }, CONSENT_STORAGE_KEY);
}

async function countGoogleTagManagerScripts(page: Page): Promise<number> {
  return page.locator('script[src*="googletagmanager.com"]').count();
}

async function countGoogleAnalyticsCookies(page: Page): Promise<number> {
  const cookies = await page.context().cookies();
  return cookies.filter((cookie) => /^_ga/.test(cookie.name)).length;
}

test("LC1.1 — renders the telemetry switch refusing with no stored record", async ({ page }) => {
  await openSettingsPanel(page);
  await expect(page.getByRole("switch")).toHaveAttribute("aria-checked", "false");
});

test("LC1.2 — records a refusal when the user saves without touching the switch", async ({ page }) => {
  await saveWithoutTouchingSwitch(page);
  expect(await readStoredTelemetry(page)).toBe(false);
});

test("LC1.3 — loads no Google tag after a save-without-touching", async ({ page }) => {
  await saveWithoutTouchingSwitch(page);
  expect(await countGoogleTagManagerScripts(page)).toBe(0);
});

test("LC1.4 — sends no request to Google after a save-without-touching", async ({ page }) => {
  const googleRequests: string[] = [];
  page.on("request", (request) => {
    if (isGoogleRequestUrl(request.url())) googleRequests.push(request.url());
  });

  await saveWithoutTouchingSwitch(page);
  await page.getByRole("link", { name: "Custo da Hora" }).click();
  await page.waitForLoadState("networkidle");

  expect(googleRequests).toEqual([]);
});

test("LC1.5 — leaves no _ga cookie after a save-without-touching", async ({ page }) => {
  await saveWithoutTouchingSwitch(page);
  await page.waitForTimeout(1000);

  expect(await countGoogleAnalyticsCookies(page)).toBe(0);
});

test("LC1.6 — treats an unparseable record as absent", async ({ page }) => {
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_STORAGE_KEY,
    value: "{",
  });
  await openSettingsPanel(page);
  await expect(page.getByRole("switch")).toHaveAttribute("aria-checked", "false");

  await page.getByRole("button", { name: "Salvar Preferências" }).click();
  expect(await readStoredTelemetry(page)).toBe(false);
  expect(await countGoogleTagManagerScripts(page)).toBe(0);
});

test("LC1.7 — renders the switch on for a stored affirmative consent", async ({ page }) => {
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_STORAGE_KEY,
    value: JSON.stringify({ telemetry: true, timestamp: 0 }),
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Configurações de Privacidade" }).click();
  await expect(page.getByRole("switch")).toHaveAttribute("aria-checked", "true");
});

test("the falsifiability control — LC1.3-LC1.5's quantity differs across at least two of three consent states", async ({
  page,
}, testInfo) => {
  const beforeAnyConsentRequests: string[] = [];
  page.on("request", (request) => {
    if (isGoogleRequestUrl(request.url())) beforeAnyConsentRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible();
  await page.waitForLoadState("networkidle");
  const beforeAnyConsent = beforeAnyConsentRequests.length;
  page.removeAllListeners("request");

  const afterAffirmativeConsentRequests: string[] = [];
  page.on("request", (request) => {
    if (isGoogleRequestUrl(request.url())) afterAffirmativeConsentRequests.push(request.url());
  });
  await page.getByRole("button", { name: "Aceitar Tudo" }).click();
  await page.waitForLoadState("networkidle");
  const afterAffirmativeConsent = afterAffirmativeConsentRequests.length;
  page.removeAllListeners("request");

  await page.evaluate((key) => localStorage.removeItem(key), CONSENT_STORAGE_KEY);
  await page.reload();
  await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible();

  const afterSaveWithoutTouchingRequests: string[] = [];
  page.on("request", (request) => {
    if (isGoogleRequestUrl(request.url())) afterSaveWithoutTouchingRequests.push(request.url());
  });
  await page.getByRole("button", { name: "Configurar" }).click();
  await page.getByRole("button", { name: "Salvar Preferências" }).click();
  await page.waitForLoadState("networkidle");
  const afterSaveWithoutTouching = afterSaveWithoutTouchingRequests.length;

  testInfo.annotations.push({
    type: "lc1-falsifiability",
    description: `before any consent: ${beforeAnyConsent}; after Aceitar Tudo: ${afterAffirmativeConsent}; after save-without-touching: ${afterSaveWithoutTouching}`,
  });

  const counts = [beforeAnyConsent, afterAffirmativeConsent, afterSaveWithoutTouching];
  expect(new Set(counts).size, `the instrument is blind: all three counts are ${counts[0]}`).toBeGreaterThanOrEqual(2);
});
