const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(t|j)sx$": "ts-jest",
    "^.+\\.scss$": "jest-scss-transform",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@mocks/(.*)$": "<rootDir>/__mocks__/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
