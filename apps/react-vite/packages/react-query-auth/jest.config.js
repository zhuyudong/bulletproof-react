/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // NOTE: The error below may be caused by using the wrong test environment, see https://jestjs.io/docs/configuration#testenvironment-string.
  // Consider using the "jsdom" test environment.
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
