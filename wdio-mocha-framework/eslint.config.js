import js from '@eslint/js';
import wdio from 'eslint-plugin-wdio';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,

  wdio.configs['flat/recommended'],

  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  eslintConfigPrettier,
];
