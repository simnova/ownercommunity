/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["<rootDir>/."],
  preset: 'ts-jest',

  globalSetup: "<rootDir>/test/global-setup.ts",
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Owner Community - Data Access Report"
    }]
  ],


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