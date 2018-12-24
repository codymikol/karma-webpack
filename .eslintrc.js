module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@webpack-contrib/eslint-config-webpack'],
  rules: {
    "comma-dangle": ["error", "never"],
    "consistent-return": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "prefer-rest-params": "off",
    "strict": ["error", "safe"]
  },
};