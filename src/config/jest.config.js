module.exports = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".js"],    // treat .js files as modules
  transform: {},                       // disable Babel transform
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["**/tests/**/*.test.js"],
  testTimeout: 60000,
  collectCoverageFrom: ["src/**/*.js"],
};