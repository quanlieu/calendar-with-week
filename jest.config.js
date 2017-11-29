module.exports = {
  verbose: true,
  setupFiles: ['./test/setup.js'],
  setupTestFrameworkScriptFile: './test/setup-script.js',
  collectCoverageFrom: ['src/**/*.js', '!src/index.js']
};
