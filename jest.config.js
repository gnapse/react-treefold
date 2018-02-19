module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  setupTestFrameworkScriptFile: './tests/setup.js',
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
  },
  moduleFileExtensions: ['js', 'json', 'jsx'],
};
