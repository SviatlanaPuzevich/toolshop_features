import js from '@eslint/js';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress';

export default [
  js.configs.recommended,

  pluginCypress.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-unused-expressions': 'off',
    },
  },
];
