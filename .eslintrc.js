module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 0,
    semi: ['error', 'never'],
    'no-console': 0,
    'import/no-cycle': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 'off',
    'react/require-default-props': [0],
    'no-use-before-define': [0],
  },
}
