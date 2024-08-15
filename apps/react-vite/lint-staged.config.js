/**
 * @type {import('lint-staged').Config}
 */
module.exports = {
  '*.{js,jsx,ts,tsx,md,mdx}': [
    // NOTE: 此处 eslint 默认不会使用 .eslintignore 文件，所以需要手动指定
    'eslint --ignore-path .eslintignore --fix'
  ],
  // '*.+(md|mdx)': 'eslint --ignore-path .eslintignore --fix',
  '**/*.ts?(x)': 'bash -c "npm run types:check"',
  '*.{json,yaml}': ['prettier --write'],
  '*.{css,less,sass,scss,styl}': [
    // https://stylelint.io/user-guide/usage/cli
    'stylelint --config ./stylelint.config.js --allow-empty-input -i ./.stylelintignore --fix'
  ]
}
