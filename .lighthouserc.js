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
			assertions: {
				"categories:performance": ["warn", { minScore: 0.7 }],
				"categories:accessibility": ["warn", { minScore: 0.8 }],
				"categories:best-practices": ["warn", { minScore: 0.8 }],
				"categories:seo": ["warn", { minScore: 0.8 }],
			},
		},
		upload: {
			target: "temporary-public-storage",
		},
	},
};
