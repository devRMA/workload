import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		["html", { open: "never" }],
		["list"],
		["junit", { outputFile: "playwright-report/results.xml" }],
	],
	timeout: 60000,
	use: {
		baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
		trace: "on-first-retry",
		actionTimeout: 15000,
		storageState: "state.json",
	},
	testIgnore: [],
	testMatch: "**/*.spec.ts",
	globalSetup: "./tests/e2e/global-setup.ts",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],
	webServer: process.env.PLAYWRIGHT_TEST_BASE_URL
		? undefined
		: {
				command: process.env.CI ? "npm run start" : "npm run dev",
				url: "http://localhost:3000",
				reuseExistingServer: !process.env.CI,
			},
});
