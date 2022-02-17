/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["<rootDir>/."],
  preset: 'ts-jest',

  globalSetup: "<rootDir>/test/global-setup.ts",


  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  coverageReporters: ['json', 'lcov'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
      "**/*.{js,jsx,ts}",
      "!**/node_modules/**",
      "!**/dist/**"
    ]
};