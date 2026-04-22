module.exports = {
	ci: {
		collect: {
			url: [process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/"],
			startServerCommand: process.env.PLAYWRIGHT_TEST_BASE_URL
				? undefined
				: "npm run start",
			numberOfRuns: 1,
			settings: {
				preset: "desktop",
			},
		},
		assert: {
			preset: "lighthouse:recommended",
			assertions: {
				"categories:performance": ["warn", { minScore: 0.9 }],
				"categories:accessibility": ["error", { minScore: 0.95 }],
				"categories:best-practices": ["error", { minScore: 0.95 }],
				"categories:seo": ["error", { minScore: 0.95 }],
				"non-composited-animations": "off",
				"unused-javascript": "warn",
				"uses-rel-preconnect": "warn",
			},
		},
		upload: {
			target: "temporary-public-storage",
		},
	},
};
