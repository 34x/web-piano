module.exports = {
  ...require('@snowpack/app-scripts-svelte/jest.config.js')(),
  modulePaths: [
      '<rootDir>/src',
      '<rootDir>/public'
  ],
  moduleNameMapper: {
      '^src(.*)': '<rootDir>/src$1',
      '^public(.*)': '<rootDir>/public$1'
  }
};