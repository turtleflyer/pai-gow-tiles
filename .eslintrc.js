module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    // 'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
    'linebreak-style': ['warn', 'windows'],
    // 'prefer-template': 'warn',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    // 'no-restricted-syntax': 'off',
    'max-len': ['warn', 100],
    // 'no-param-reassign': 'warn',
    'no-return-assign': ['error', 'except-parens'],
  },
};
