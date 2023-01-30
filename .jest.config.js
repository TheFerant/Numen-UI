module.exports = {
  verbose: true,

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['./src/tests/setup.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testPathIgnorePatterns: ['/pages/', '/dist/', '/lib/', '/esm/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './src/tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: 'use-classes\\/.*\\.test\\.(j|t)sx?$',

  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/styles.{ts,tsx}',
    '!src/components/**/*types.{ts,tsx}',
    '!src/components/use-theme/*',
    '!src/components/use-all-themes/*',
    '!src/components/themes/*',
    '!src/components/numen-provider/*',
    '!src/components/index.ts',
    '!src/components/utils/**/*',
  ],

  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/src/tests/$1',
    components: '<rootDir>/src/components/index.ts',
  },
}
