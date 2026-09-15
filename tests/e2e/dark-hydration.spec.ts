import { expect, type Page, test } from "@playwright/test";

const ROUTES = ["/", "/custo-da-hora"] as const;

interface ThemeToggleState {
  iconCount: number;
  moonDisplay: string | null;
  sunDisplay: string | null;
  toggleRect: { x: number; y: number; width: number; height: number } | null;
  toggleAccessibleName: string | null;
  ariaLiveInsideHeader: boolean;
}

async function captureThemeToggleState(page: Page): Promise<ThemeToggleState> {
  return page.evaluate(() => {
    const header = document.querySelector("header");
    const icons = header?.querySelectorAll("[data-theme-icon]") ?? [];
    const moon = header?.querySelector('[data-theme-icon="moon"]') ?? null;
    const sun = header?.querySelector('[data-theme-icon="sun"]') ?? null;
    const toggle = header?.querySelector('button[aria-label="Alternar tema"]') ?? null;
    const rect = toggle?.getBoundingClientRect() ?? null;
    return {
      iconCount: icons.length,
      moonDisplay: moon ? getComputedStyle(moon).display : null,
      sunDisplay: sun ? getComputedStyle(sun).display : null,
      toggleRect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
      toggleAccessibleName: toggle?.getAttribute("aria-label") ?? null,
      ariaLiveInsideHeader: (header?.querySelector("[aria-live]") ?? null) !== null,
    };
  });
}

async function headerLayoutShiftCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return 0;
    const entries = performance.getEntriesByType("layout-shift") as unknown as Array<{
      sources?: Array<{ node?: Node }>;
    }>;
    return entries.filter((entry) => entry.sources?.some((source) => source.node && header.contains(source.node)))
      .length;
  });
}

async function assertThemeIconIsCorrectAndStable(page: Page, route: string, expectedVisibleGlyph: "sun" | "moon") {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(route, { waitUntil: "domcontentloaded" });
  const domContentLoadedState = await captureThemeToggleState(page);

  await page.waitForLoadState("networkidle");
  const networkIdleState = await captureThemeToggleState(page);

  expect(pageErrors).toEqual([]);

  const serverHtml = await (await page.request.get(route)).text();
  expect(serverHtml).toContain('data-theme-icon="sun"');
  expect(serverHtml).toContain('data-theme-icon="moon"');

  const hiddenGlyph = expectedVisibleGlyph === "sun" ? "moon" : "sun";

  expect(domContentLoadedState[`${expectedVisibleGlyph}Display`]).not.toBe("none");
  expect(domContentLoadedState[`${hiddenGlyph}Display`]).toBe("none");

  expect(domContentLoadedState.iconCount).toBe(2);
  expect(networkIdleState.iconCount).toBe(2);
  expect(networkIdleState.sunDisplay).toBe(domContentLoadedState.sunDisplay);
  expect(networkIdleState.moonDisplay).toBe(domContentLoadedState.moonDisplay);

  expect(networkIdleState.toggleRect).toEqual(domContentLoadedState.toggleRect);
  expect(await headerLayoutShiftCount(page)).toBe(0);

  expect(domContentLoadedState.toggleAccessibleName).toBe("Alternar tema");
  expect(networkIdleState.toggleAccessibleName).toBe("Alternar tema");
  expect(domContentLoadedState.ariaLiveInsideHeader).toBe(false);
  expect(networkIdleState.ariaLiveInsideHeader).toBe(false);
  await expect(page.getByRole("button", { name: "Alternar tema" })).toBeVisible();
}

test.describe("Dark hydration — production build, dark system theme", () => {
  for (const route of ROUTES) {
    test(`zero pageerror and theme-correct first paint on ${route}`, async ({ page }) => {
      await assertThemeIconIsCorrectAndStable(page, route, "sun");
    });
  }
});

test.describe("Dark hydration — production build, light system theme", () => {
  for (const route of ROUTES) {
    test(`zero pageerror and theme-correct first paint on ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" });
      await assertThemeIconIsCorrectAndStable(page, route, "moon");
    });
  }
});
