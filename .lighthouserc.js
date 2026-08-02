module.exports = {
  ci: {
    collect: {
      url: [process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/"],
      startServerCommand: process.env.PLAYWRIGHT_TEST_BASE_URL ? undefined : "npm run start",
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["error", { minScore: 0.85 }],
        "categories:best-practices": ["error", { minScore: 0.75 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
