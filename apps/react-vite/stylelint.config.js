/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-no-unsupported-browser-features'
  ],
  plugins: [
    'stylelint-prettier',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  // customSyntax: 'postcss-less',
  rules: {
    // 'block-no-empty': null,
    // 'no-empty-source': null,
    'at-rule-no-unknown': null,
    'font-family-name-quotes': 'always-where-recommended',
    // 'no-descending-specificity': null,
    // 'keyframes-name-pattern': null
    'prettier/prettier': true
  }
}
