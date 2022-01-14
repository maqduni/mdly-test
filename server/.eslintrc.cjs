module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    'sourceType': 'module',
  },
  rules: {
    // override/add rules settings here, such as:
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'avoidEscape': true, }],
    'object-curly-spacing': ['error', 'always'],
    'semi': ['error', 'always'],
  },
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest/globals': true,
  },
  globals: {
    'process': true,
  },
};
