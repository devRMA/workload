import { expect, test } from "@playwright/test";

const MAX_HEADING_FONT_SIZE_PX = 40;
const D3_VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];
const D3_MIN_WIDTH_PX = 240;
const D3_MIN_TEXT_LENGTH = 80;

test.describe("Responsive layout", () => {
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

  test("keeps headings at a readable size instead of scaling them up", async ({ page }) => {
    const fontSizes = await page
      .locator("h1, h2")
      .evaluateAll((headings) => headings.map((heading) => Number.parseFloat(getComputedStyle(heading).fontSize)));

    expect(fontSizes.length).toBeGreaterThan(0);
    for (const fontSize of fontSizes) {
      expect(fontSize).toBeLessThanOrEqual(MAX_HEADING_FONT_SIZE_PX);
    }
  });

  test("never collapses a long text block inward", async ({ page }) => {
    for (const viewport of D3_VIEWPORTS) {
      await page.setViewportSize(viewport);

      const collapsedElements = await page.evaluate(
        ({ minWidth, minTextLength }) => {
          return [...document.querySelectorAll("main *, footer *")]
            .map((element) => {
              const ownText = [...element.childNodes]
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.textContent ?? "")
                .join("")
                .trim();
              return { element, ownText };
            })
            .filter(({ ownText }) => ownText.length > minTextLength)
            .filter(({ element }) => element.getClientRects().length > 0)
            .map(({ element, ownText }) => ({
              tag: element.tagName.toLowerCase(),
              width: element.getBoundingClientRect().width,
              text: ownText.slice(0, 60),
            }))
            .filter(({ width }) => width < minWidth);
        },
        { minWidth: D3_MIN_WIDTH_PX, minTextLength: D3_MIN_TEXT_LENGTH },
      );

      expect(collapsedElements).toEqual([]);
    }
  });
});
