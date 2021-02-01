module.exports = {
  root: true,
  globals: {
    "jasmine": true,
  },
  plugins: ['prettier'],
  extends: ['@webpack-contrib/eslint-config-webpack'],
  rules: {
    "consistent-return": "off",
    "camelcase": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "prefer-rest-params": "off",
    "strict": ["error", "safe"],
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'es5', arrowParens: 'always' },
    ],
  },
};
