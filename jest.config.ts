/*
 * https://jestjs.io/docs/configuration
 */

const jestConfig = {
  automock: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

export default jestConfig;
