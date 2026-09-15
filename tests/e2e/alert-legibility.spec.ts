import { expect, type Page, test } from "@playwright/test";
import {
  assertLr1,
  assertLr2b,
  assertLr3,
  assertLr3Rendering,
  driveC5,
  driveUntil,
  expectLr2a,
  measureSurface,
  waitForStableBoundingBox,
} from "./support/legibility";

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

interface Consumer {
  id: string;
  route: string;
  role: "alert" | "status";
  title: string;
  drive?: (page: Page) => Promise<void>;
}

const CONSUMERS: readonly Consumer[] = [
  {
    id: "C1",
    route: "/custo-da-hora",
    role: "alert",
    title: "Informe o seu salário bruto",
  },
  {
    id: "C2",
    route: "/custo-da-hora",
    role: "alert",
    title: "Informe a carga horária mensal",
    drive: async (page) => {
      await page.getByLabel("Carga Horária Mensal").fill("");
    },
  },
  {
    id: "C3",
    route: "/custo-da-hora",
    role: "status",
    title: "A carga mensal não combina com a jornada diária",
    drive: async (page) => {
      await page.getByLabel("Carga Horária Mensal").fill("200");
    },
  },
  {
    id: "C4",
    route: "/",
    role: "alert",
    title: "Confira seus horários",
    drive: async (page) => {
      const lunchStart = page.getByLabel("Hora para Saída Almoço");
      await lunchStart.fill("0700");
      await lunchStart.blur();
    },
  },
  {
    id: "C5",
    route: "/",
    role: "status",
    title: "Você passou de 2h extras hoje",
    drive: driveC5,
  },
];

test.describe("Alert banner legibility — C1 to C5", () => {
  for (const consumer of CONSUMERS) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`${consumer.id} stays legible at ${consumer.route} ${viewport.width}x${viewport.height} ${theme}`, async ({
          page,
        }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme: theme });
          await page.goto(consumer.route);

          const root = page.getByRole(consumer.role).filter({ hasText: consumer.title });
          const title = root.locator("p").nth(0);
          const bodyText = root.locator("p").nth(1);
          const label = `${consumer.id} ${consumer.route} ${viewport.width}x${viewport.height} ${theme}`;

          const { drive } = consumer;
          if (drive) {
            await driveUntil(
              () => drive(page),
              () => root.isVisible(),
              label,
            );
          } else {
            await expect(root).toBeVisible();
          }

          await expect(root).toHaveCount(1);
          await expect(title).toHaveText(consumer.title);
          await waitForStableBoundingBox(root);

          const measurement = await measureSurface(root, bodyText);

          await assertLr1(root);

          expectLr2a(measurement, label);

          if (consumer.id === "C1") {
            await assertLr3(page, "/custo-da-hora", root, "Sem ele os valores abaixo");
          } else {
            await assertLr3Rendering(root);
          }

          if (viewport.width === 1440) {
            await assertLr2b(bodyText);
          }
        });
      }
    }
  }
});
