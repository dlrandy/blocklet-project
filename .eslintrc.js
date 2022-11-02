module.exports = {
  root: true,
  extends: '@arcblock/eslint-config',
  globals: {
    logger: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
