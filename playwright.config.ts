import { defineConfig, devices } from "@playwright/test";

const WIDE_VIEWPORT_SPEC = "**/wide-viewport.spec.ts";
const DARK_HYDRATION_SPEC = "**/dark-hydration.spec.ts";

const PORT = process.env.PORT ?? "3000";
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never" }], ["list"], ["junit", { outputFile: "playwright-report/results.xml" }]],
  timeout: 60000,
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    actionTimeout: 15000,
    storageState: {
      cookies: [],
      origins: [
        {
          origin: BASE_URL,
          localStorage: [
            {
              name: "workload_cookie_consent",
              value: JSON.stringify({ telemetry: true, timestamp: 0 }),
            },
          ],
        },
      ],
    },
  },
  testMatch: "**/*.spec.ts",
  projects: [
    {
      name: "chromium",
      testIgnore: DARK_HYDRATION_SPEC,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      testIgnore: [WIDE_VIEWPORT_SPEC, DARK_HYDRATION_SPEC],
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      testIgnore: [WIDE_VIEWPORT_SPEC, DARK_HYDRATION_SPEC],
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Dark production",
      testMatch: DARK_HYDRATION_SPEC,
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
    },
  ],
  webServer: {
    command: process.env.CI ? "pnpm start" : "pnpm build && pnpm start",
    url: BASE_URL,
    // A reused server carries the NEXT_PUBLIC_* values of whoever started it; a mismatched
    // one silently serves a different page and the suite blames the application.
    reuseExistingServer: false,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_GA_ID: "G-TEST12345",
      NEXT_PUBLIC_ENABLE_ADS: "true",
      NEXT_PUBLIC_ADSENSE_ID: "ca-pub-0000000000000000",
    },
  },
});
