const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";
const preset = process.env.LH_PRESET;

module.exports = {
  ci: {
    collect: {
      url: [`${baseUrl}/`, `${baseUrl}/custo-da-hora`],
      startServerCommand: process.env.PLAYWRIGHT_TEST_BASE_URL ? undefined : "pnpm start",
      numberOfRuns: 3,
      settings: preset ? { preset } : undefined,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.93 }],
        "categories:accessibility": ["error", { minScore: 0.98 }],
        "categories:best-practices": ["error", { minScore: 0.98 }],
        "categories:seo": ["error", { minScore: 0.98 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
