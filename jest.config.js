module.exports = {
  ...require('@snowpack/app-scripts-svelte/jest.config.js')(),
  moduleNameMapper: {
      '^src/(.*)': '<rootDir>/src/$1',
      '^public/(.*)': '<rootDir>/public/$1'
  },
  // modulePaths: [
  //     '<rootDir>' , '<rootDir>/node_modules'
  // ],
  // moduleDirectories: [
  //   "node_modules"
  // ],
  clearMocks: true,
  resetMocks: true,
  resetModules: true,
};