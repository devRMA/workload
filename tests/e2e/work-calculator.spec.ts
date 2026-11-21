import { expect } from "@playwright/test";
import { test } from "./support/fixtures";

test.describe("Work Calculator (Jornada)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Jornada" }).click();
  });

  test("should display default values correctly", async ({ page }) => {
    await expect(page.locator('h2:has-text("Sua Jornada")')).toBeVisible();
    await expect(page.locator('text="Entrada"')).toBeVisible();
    await expect(page.locator('text="Saída Almoço"')).toBeVisible();
    await expect(page.locator('text="Volta Almoço"')).toBeVisible();
  });

  test("should allow manual exit input", async ({ page }) => {
    await page.getByRole("radio", { name: "MANUAL" }).check();
    await expect(page.locator('text="Saída Real"').first()).toBeVisible();
  });

  test("surrounds the countdown with the dial and keeps the exit and edit link in the first mobile view", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const result = page.locator("p[aria-live=polite]").filter({ hasText: /^17:48$/ });
    const progress = page.locator("svg").filter({ has: page.locator("circle[stroke-dasharray]") });
    await expect(result).toBeInViewport();
    await expect(progress).toBeInViewport();
    const editLink = page.getByRole("link", { name: "Editar horários" });
    const dock = page.getByRole("navigation", { name: "Calculadoras" });
    const [dial, timer, exit, edit, navigation] = await Promise.all([
      progress.boundingBox(),
      progress.locator("..").locator("span.numeric").boundingBox(),
      result.boundingBox(),
      editLink.boundingBox(),
      dock.boundingBox(),
    ]);
    if (!dial || !timer || !exit || !edit || !navigation) throw new Error("Missing result geometry");
    expect(timer.x).toBeGreaterThan(dial.x);
    expect(timer.x + timer.width).toBeLessThan(dial.x + dial.width);
    expect(timer.y).toBeGreaterThan(dial.y);
    expect(timer.y + timer.height).toBeLessThan(dial.y + dial.height);
    expect(dial.y + dial.height).toBeLessThan(exit.y);
    expect(edit.y + edit.height).toBeLessThan(navigation.y);
  });

  test("takes keyboard focus from each result to its editor on a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.getByRole("link", { name: "Custo da Hora", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Copiar horário de saída" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Editar horários" })).toBeFocused();

    for (const [action, destination] of [
      ["Editar horários", "Sua Jornada"],
      ["Editar salário", "Custo da Hora"],
    ] as const) {
      if (destination === "Custo da Hora") {
        await page.getByRole("link", { name: "Custo da Hora", exact: true }).click();
      }
      const editLink = page.getByRole("link", { name: action });
      await expect(editLink).toBeInViewport();
      await editLink.press("Enter");
      const heading = page.getByRole("heading", { name: destination, level: 2 });
      await expect(heading).toBeFocused();
      await expect(heading).toBeInViewport();
      const header = page.locator("header").filter({ has: page.getByRole("heading", { level: 1 }) });
      const headerBottom = await header.evaluate((element) => element.getBoundingClientRect().bottom);
      expect(await heading.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(headerBottom);
    }
  });

  test("uses solid chrome and keeps the settings icon still when requested", async ({ page }) => {
    const chrome = page.locator(".glass-chrome");
    await expect(chrome).toHaveCount(2);
    for (const surface of await chrome.all()) {
      await expect(surface).not.toHaveCSS("backdrop-filter", "none");
    }

    await page.emulateMedia({ contrast: "more", reducedMotion: "reduce" });
    for (const surface of await chrome.all()) {
      await expect(surface).toHaveCSS("backdrop-filter", "none");
      const opaqueColor = await surface.evaluate((element) => {
        const probe = document.createElement("span");
        probe.style.backgroundColor = "var(--color-surface-raised)";
        element.append(probe);
        const color = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return color;
      });
      await expect(surface).toHaveCSS("background-color", opaqueColor);
    }
    const settings = page.getByRole("button", { name: "Configurações da Jornada" });
    const settingsIcon = settings.locator("svg");
    const restingRotation = await settingsIcon.evaluate((element) => getComputedStyle(element).rotate);
    await settings.click();
    await expect(settings).toHaveAttribute("aria-expanded", "true");
    await expect(settingsIcon).toHaveCSS("rotate", restingRotation);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(settingsIcon).toHaveCSS("rotate", "90deg");
  });

  test("deforms only the mobile color field with scroll and respects reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const field = page.locator(".glass-field");
    await expect(field).toHaveCount(1);
    const shape = () => field.evaluate((element) => getComputedStyle(element, "::before").transform);
    const dock = page.getByRole("navigation", { name: "Calculadoras" });
    const dockTop = () => dock.evaluate((element) => element.getBoundingClientRect().top);

    const rest = await shape();
    const stationaryTop = await dockTop();
    await page.evaluate(() => window.scrollTo(0, 160));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(160);
    await expect.poll(shape).not.toBe(rest);
    expect(await dockTop()).toBe(stationaryTop);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(shape).toBe(rest);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo(0, 160));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(160);
    await expect.poll(shape).toBe("none");
    await expect(dock.locator(".glass-dock")).not.toHaveCSS("backdrop-filter", /url/);
  });

  test("should open settings and update work minutes", async ({ page }) => {
    await page.getByLabel("Configurações da Jornada").click();
    await expect(page.locator('label:has-text("Tempo de Trabalho Diário")')).toBeVisible();

    const journeyInput = page.locator("#daily-journey");
    await journeyInput.fill("0800");
    await journeyInput.blur();

    await expect(journeyInput).toHaveValue("08:00");
  });
});
