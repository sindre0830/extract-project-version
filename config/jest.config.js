module.exports = {
  roots: ["../tests"],
  clearMocks: true,
  fakeTimers: {},
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
