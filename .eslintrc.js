module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'always'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/attribute-hyphenation': [2, 'never'],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 6,
        multiline: {
          max: 6,
          allowFirstLine: false
        }
      }
    ]
  },
  globals: {}
}
