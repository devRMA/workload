import fs from "node:fs";
import path from "node:path";
import type { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
	const { baseURL, storageState } = config.projects[0].use;
	const statePath =
		typeof storageState === "string" ? storageState : "state.json";

	const storage = {
		cookies: [],
		origins: [
			{
				origin: baseURL || "http://localhost:3000",
				localStorage: [
					{
						name: "workload_cookie_consent",
						value: JSON.stringify({
							telemetry: true,
							timestamp: Date.now(),
						}),
					},
				],
			},
		],
	};

	if (!fs.existsSync(path.dirname(statePath))) {
		fs.mkdirSync(path.dirname(statePath), { recursive: true });
	}
	fs.writeFileSync(statePath, JSON.stringify(storage));
}

export default globalSetup;
