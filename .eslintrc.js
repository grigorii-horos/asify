// @ts-nocheck
var restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "es5"
  },
  extends: [
    "eslint:recommended",
    "airbnb-base/legacy",
  ],
  plugins: [
    "json",
    "html",
    "markdown",
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
    "import/extensions":0,
    "no-console":0,
    "func-names":0,
    "valid-typeof":0,
    "consistent-return": 0,
    "no-shadow":0,
    "array-callback-return":0,
    "guard-for-in":0,
    "no-plusplus":0,
    "no-unused-expressions":0,
    "vars-on-top":0

  },
  "overrides": [{
        "files": ["**/*.md"],
        "rules": {
            "no-undef": "off",
            "no-unused-vars": "off",
            "no-console": "off",
            "padded-blocks": "off"
        }
    }]
};
