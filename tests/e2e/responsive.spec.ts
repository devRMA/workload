import { expect, test } from "@playwright/test";

const MAX_HEADING_FONT_SIZE_PX = 40;

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

	test("keeps every control reachable inside the viewport", async ({
		page,
	}) => {
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

	test("keeps headings at a readable size instead of scaling them up", async ({
		page,
	}) => {
		const fontSizes = await page
			.locator("h1, h2")
			.evaluateAll((headings) =>
				headings.map((heading) =>
					Number.parseFloat(getComputedStyle(heading).fontSize),
				),
			);

		expect(fontSizes.length).toBeGreaterThan(0);
		for (const fontSize of fontSizes) {
			expect(fontSize).toBeLessThanOrEqual(MAX_HEADING_FONT_SIZE_PX);
		}
	});
});
