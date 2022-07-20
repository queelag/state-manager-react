/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  moduleNameMapper: {
    nanoid: '<rootDir>/node_modules/nanoid'
  },
  setupFiles: ['<rootDir>/mocks/nanoid.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
}
