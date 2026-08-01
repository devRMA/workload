import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: [
		["html", { open: "never" }],
		["list"],
		["junit", { outputFile: "playwright-report/results.xml" }],
	],
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
	testIgnore: [],
	testMatch: "**/*.spec.ts",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "desktop-qhd",
			use: {
				...devices["Desktop Chrome"],
				viewport: { width: 2560, height: 1440 },
			},
		},
		{
			name: "desktop-4k",
			use: {
				...devices["Desktop Chrome"],
				viewport: { width: 3840, height: 2160 },
			},
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
	webServer: {
		command: process.env.CI ? "npm run start" : "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
