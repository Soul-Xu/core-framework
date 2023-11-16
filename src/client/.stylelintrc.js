module.exports = {
  extends: [
    "stylelint-scss",
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    "stylelint-config-prettier-scss",
    "stylelint-config-standard-scss"
  ],
  plugins: [
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-scss"
  ],
  rules: {
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    'font-family-no-missing-generic-family-keyword': null, // 禁用该规则
  },
}
