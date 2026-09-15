import { expect, test } from "@playwright/test";
import { driveC5, driveUntil, expectLr2a, measureSurface, waitForStableBoundingBox } from "./support/legibility";

const WIDE_VIEWPORTS = [
  { name: "QHD", width: 2560, height: 1440 },
  { name: "4K", width: 3840, height: 2160 },
];

for (const { name, width, height } of WIDE_VIEWPORTS) {
  test.describe(`Wide viewport ${name}`, () => {
    test.use({ viewport: { width, height } });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("never scrolls horizontally", async ({ page }) => {
      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      });

      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("keeps every control reachable inside the viewport", async ({ page }) => {
      const unreachableControls = await page.evaluate(() =>
        [...document.querySelectorAll("main button, main input, main a")]
          .filter((control) => {
            const bounds = control.getBoundingClientRect();
            if (bounds.width === 0) return false;
            return bounds.right > window.innerWidth + 1 || bounds.left < -1;
          })
          .map((control) => control.outerHTML.slice(0, 120)),
      );

      expect(unreachableControls).toEqual([]);
    });

    test("keeps the alert banner's chrome inside its budget", async ({ page }) => {
      const root = page.getByRole("status").filter({ hasText: "Você passou de 2h extras hoje" });
      const bodyText = root.locator("p").nth(1);
      const label = `C5 / ${width}x${height} light`;

      await driveUntil(
        () => driveC5(page),
        () => root.isVisible(),
        label,
      );

      await waitForStableBoundingBox(root);

      const measurement = await measureSurface(root, bodyText);

      expectLr2a(measurement, label);
    });
  });
}
