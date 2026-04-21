import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		exclude: ["**/node_modules/**", "**/tests/e2e/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
			exclude: [
				"node_modules/**",
				"tests/e2e/**",
				"vitest.setup.ts",
				"**/*.d.ts",
				"**/.next/**",
				"playwright.config.ts",
				"postcss.config.mjs",
				"tailwind.config.ts",
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
});
