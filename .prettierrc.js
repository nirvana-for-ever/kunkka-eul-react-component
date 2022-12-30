module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  singleAttributePerLine: true,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
};
