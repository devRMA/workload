import { expect, type Page } from "@playwright/test";
import { test } from "./support/fixtures";
import { assertLr1 } from "./support/legibility";

const VIEWPORTS = [
  { name: "320", width: 320, height: 568 },
  { name: "390", width: 390, height: 844 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;
const ROUTES = ["/", "/custo-da-hora"] as const;
const STORAGE_STATES = ["empty", "seeded"] as const;

const EXPECTED_CENSUS_SIZE: Record<(typeof ROUTES)[number], number> = {
  "/": 10,
  "/custo-da-hora": 4,
};

async function applySeed(page: Page, route: (typeof ROUTES)[number]) {
  await page.addInitScript((currentRoute) => {
    const pad = (value: number) => String(value).padStart(2, "0");
    const todayAt = (hour: number, minute: number) => {
      const now = new Date();
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(hour)}:${pad(minute)}`;
    };
    if (currentRoute === "/custo-da-hora") {
      localStorage.setItem("grossSalary", "4200");
      localStorage.setItem("salaryPeriod", "month");
      return;
    }
    localStorage.setItem("workMinutes", "528");
    localStorage.setItem("firstTierRate", "50");
    localStorage.setItem("extraTierRate", "100");
    localStorage.setItem("entry", todayAt(8, 0));
    localStorage.setItem("lunchStart", todayAt(12, 0));
    localStorage.setItem("lunchEnd", todayAt(12, 30));
    localStorage.setItem("exitOverride", todayAt(19, 30));
    localStorage.setItem("isManualExit", "true");
  }, route);
}

async function custoDaHoraCensus(page: Page) {
  return page.evaluate(() => {
    const boxesOfElements = (elements: Element[]) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
    const column = Array.from(document.querySelectorAll(".lg\\:col-span-7"));
    const regimeButton = Array.from(document.querySelectorAll('button[aria-controls="regime-options"]'));
    const hoursInput = document.querySelector("#horas-mensais");
    const hoursWrapper = hoursInput?.parentElement ? [hoursInput.parentElement] : [];
    const briefcase = Array.from(document.querySelectorAll("svg.tabler-icon-briefcase"));
    const groups = [
      { name: "gives the form column a non-zero box", elements: column },
      { name: "gives the regime disclosure button a non-zero box", elements: regimeButton },
      { name: "gives the hours-mensais input wrapper a non-zero box", elements: hoursWrapper },
      { name: "gives the regime briefcase icon a non-zero box", elements: briefcase },
    ];
    return groups.map(({ name, elements }) => ({ name, count: elements.length, boxes: boxesOfElements(elements) }));
  });
}

async function workCalculatorTextboxCount(page: Page): Promise<number> {
  return page.locator(".lg\\:col-span-7").getByRole("textbox").count();
}

async function workCalculatorCensus(page: Page) {
  return page.evaluate(() => {
    const boxesOfElements = (elements: Element[]) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
    const column = document.querySelector(".lg\\:col-span-7");
    const columnElements = column ? [column] : [];
    const textInputs = column ? Array.from(column.querySelectorAll('input[type="text"]')) : [];
    const inputWrappers = textInputs
      .map((input) => input.parentElement)
      .filter((element): element is HTMLElement => element !== null);
    const loginIcon = column ? Array.from(column.querySelectorAll("svg.tabler-icon-login")) : [];
    const groups = [
      { name: "gives the form column a non-zero box", elements: columnElements },
      { name: "gives each journey input's wrapper a non-zero box", elements: inputWrappers },
      { name: "gives the entrada label icon a non-zero box", elements: loginIcon },
    ];
    return groups.map(({ name, elements }) => ({ name, count: elements.length, boxes: boxesOfElements(elements) }));
  });
}

for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.name} viewport`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const theme of THEMES) {
      test.describe(`${theme} theme`, () => {
        test.use({ colorScheme: theme });

        for (const route of ROUTES) {
          test.describe(`route ${route}`, () => {
            for (const storage of STORAGE_STATES) {
              test.describe(`storage ${storage}`, () => {
                test.beforeEach(async ({ page }) => {
                  if (storage === "seeded") await applySeed(page, route);
                  await page.goto(route);
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

                test("gives every element of the form column a non-zero box", async ({ page }) => {
                  if (route === "/") {
                    const textboxCount = await workCalculatorTextboxCount(page);
                    expect(textboxCount, "expected exactly 8 journey textboxes inside the column").toBe(8);
                  }

                  const census =
                    route === "/custo-da-hora" ? await custoDaHoraCensus(page) : await workCalculatorCensus(page);
                  const totalNodes = census.reduce((total, group) => total + group.count, 0);
                  expect(totalNodes, `expected exactly ${EXPECTED_CENSUS_SIZE[route]} nodes for route ${route}`).toBe(
                    EXPECTED_CENSUS_SIZE[route],
                  );

                  for (const group of census) {
                    for (const box of group.boxes) {
                      expect(box.width, group.name).toBeGreaterThan(0);
                      expect(box.height, group.name).toBeGreaterThan(0);
                    }
                  }

                  await assertLr1(page.locator(".lg\\:col-span-7"));
                });
              });
            }
          });
        }
      });
    }
  });
}
