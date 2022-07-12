module.exports = {
  'verbose': true,
  'roots': [
    './src'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '^.+\\.spec\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  'moduleNameMapper': {
    '^@core/(.*)': '<rootDir>/src/core/$1'
  }
};