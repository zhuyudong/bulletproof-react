/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  plugins: [
    require.resolve('prettier-plugin-tailwindcss')
    // require('@ianvs/prettier-plugin-sort-imports')
  ]
}
