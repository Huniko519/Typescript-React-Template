module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  globals: {
    JSX: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
        paths: ['src'],
      },
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    'react/react-in-jsx-scope': 'off',
    // possible-errors
    'no-console': [1],
    'object-curly-newline': [1, { consistent: true }],
    'object-curly-spacing': [1, 'always'],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'global-require': 0,
    'react/function-component-definition': 0,
    'arrow-body-style': 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-param-reassign': [2, { props: false }],
    'dot-notation': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-danger': 0,
    'operator-linebreak': 0,
  },
};
