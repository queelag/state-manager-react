/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverageFrom: ['src/**/*.tsx'],
  setupFiles: ['<rootDir>/mocks/nanoid.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
}
