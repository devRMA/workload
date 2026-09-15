import { defineConfig, devices } from "@playwright/test";

const WIDE_VIEWPORT_SPEC = "**/wide-viewport.spec.ts";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never" }], ["list"], ["junit", { outputFile: "playwright-report/results.xml" }]],
  timeout: 60000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    actionTimeout: 15000,
    storageState: {
      cookies: [],
      origins: [
        {
          origin: "http://localhost:3000",
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
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      testIgnore: WIDE_VIEWPORT_SPEC,
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      testIgnore: WIDE_VIEWPORT_SPEC,
      use: { ...devices["iPhone 12"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "pnpm start" : "pnpm dev",
    url: "http://localhost:3000",
    // A reused server carries the NEXT_PUBLIC_* values of whoever started it; a mismatched
    // one silently serves a different page and the suite blames the application.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
