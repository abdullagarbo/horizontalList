module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    // your custom rules
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
  env: {
    browser: true, // This will define browser global variables like `window`
    node: true, // This allows usage of Node.js global variables and Node.js scoping
    es6: true, // This enables ES6 global variables
    jest: true, // This defines Jest global variables like `jest`
  },
};
