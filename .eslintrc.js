// @ts-nocheck
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "airbnb-base/legacy",
  ],
  plugins: [
    "json",
    "html",
    "markdown",
    "no-loops"
  ],
  env: {
    browser: true,
    es6: false
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  rules: {
    "no-console":0,
    "func-names":0,
    "valid-typeof":0,
    "consistent-return": 0,
    "no-shadow":0,
    "array-callback-return":0,
    "guard-for-in":0,
    "no-plusplus":0,
    "no-unused-expressions":0,
    "vars-on-top":0,
    "no-param-reassign":0,
    "eqeqeq":0,
    "no-restricted-syntax":0,
    "no-prototype-builtins":0
  },
  "overrides": [{
        "env":{
          "es6": true
        },
        "files": ["**/*.md"],
        "rules": {
            "no-undef": "off",
            "no-unused-vars": "off",
            "no-console": "off",
            "padded-blocks": "off"
        }
    }]
};
