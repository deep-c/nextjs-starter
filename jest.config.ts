/* istanbul ignore file */
import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  automock: false,
  clearMocks: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'tests/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!*.js',
    '!coverage/**',
    '!.next/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globalSetup: '<rootDir>/tests/jest.globalSetup.ts',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.+\\.css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setupAfterEnv.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/tests/css-transform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default jestConfig;
