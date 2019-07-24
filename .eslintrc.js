// @ts-nocheck
var restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
  ],
  plugins: [
    "json",
    "html",
    "no-loops",
    "async-await",
    "prefer-object-spread",
    "promise"
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  rules: {
    "prefer-object-spread/prefer-object-spread": 2,
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "import/extensions":0
  }
};
