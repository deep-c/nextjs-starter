import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  automock: false,
  clearMocks: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/types/**',
    '!**/*.d.ts',
    '!coverage/**',
    '!.next/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globalSetup: '<rootDir>/test/jest.globalSetup.ts',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '.+\\.css$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/test', '<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setupAfterEnv.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/test/css.transform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default jestConfig;
