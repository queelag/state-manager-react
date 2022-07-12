/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  setupFiles: ['<rootDir>/mocks/nanoid.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
}
