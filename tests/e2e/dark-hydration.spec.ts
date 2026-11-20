import { expect, type Page, test } from "@playwright/test";

const ROUTES = ["/", "/custo-da-hora"] as const;
const HEADER_LAYOUT_SHIFT_MARK = "workload-test:header-layout-shift";

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

async function observeHeaderLayoutShifts(page: Page) {
  await page.addInitScript((mark) => {
    interface LayoutShiftEntry extends PerformanceEntry {
      sources: readonly { node: Node | null; previousRect: DOMRectReadOnly; currentRect: DOMRectReadOnly }[];
    }

    const observer = new PerformanceObserver((list) => {
      const header = document.querySelector("header");
      if (!header) return;

      for (const entry of list.getEntries() as LayoutShiftEntry[]) {
        const sources = entry.sources
          .filter(
            ({ node, previousRect, currentRect }) =>
              header.contains(node) && (previousRect.x !== currentRect.x || previousRect.y !== currentRect.y),
          )
          .map(({ node, previousRect, currentRect }) => ({
            node: node?.nodeName,
            text: node?.textContent,
            previous: previousRect.toJSON(),
            current: currentRect.toJSON(),
          }));
        if (sources.length > 0) performance.mark(mark, { detail: sources });
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
  }, HEADER_LAYOUT_SHIFT_MARK);
}

async function headerLayoutShiftCount(page: Page): Promise<number> {
  return page.evaluate((mark) => performance.getEntriesByName(mark, "mark").length, HEADER_LAYOUT_SHIFT_MARK);
}

async function assertThemeIconIsCorrectAndStable(page: Page, route: string, expectedVisibleGlyph: "sun" | "moon") {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await observeHeaderLayoutShifts(page);
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
  expect(await page.evaluate(() => PerformanceObserver.supportedEntryTypes.includes("layout-shift"))).toBe(true);
  const shifts = await page.evaluate(
    (mark) => performance.getEntriesByName(mark, "mark").map((entry) => (entry as PerformanceMark).detail),
    HEADER_LAYOUT_SHIFT_MARK,
  );
  expect(shifts).toEqual([]);

  expect(domContentLoadedState.toggleAccessibleName).toBe("Alternar tema");
  expect(networkIdleState.toggleAccessibleName).toBe("Alternar tema");
  expect(domContentLoadedState.ariaLiveInsideHeader).toBe(false);
  expect(networkIdleState.ariaLiveInsideHeader).toBe(false);
  await expect(page.getByRole("button", { name: "Alternar tema" })).toBeVisible();
}

test.describe("Dark hydration — production build, dark system theme", () => {
  test("detects a real displacement of the painted header", async ({ page }) => {
    await observeHeaderLayoutShifts(page);
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });

    const before = await headerLayoutShiftCount(page);
    await page.addStyleTag({ content: "header { top: 80px !important; }" });

    await expect.poll(() => headerLayoutShiftCount(page)).toBeGreaterThan(before);
  });

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
