/* istanbul ignore file */
import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  automock: false,
  clearMocks: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'tests/**/*.{js,jsx,ts,tsx}',
    '!src/types/**',
    '!tests/css.transform.js',
    '!tests/prisma.mock.ts',
    '!**/*.d.ts',
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
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setupAfterEnv.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/tests/css.transform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default jestConfig;
