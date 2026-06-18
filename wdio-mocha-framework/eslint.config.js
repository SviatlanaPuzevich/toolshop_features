import js from '@eslint/js';
import wdio from 'eslint-plugin-wdio';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    js.configs.recommended,

    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.mocha,
            },
        },
        plugins: {
            wdio,
        },
        rules: {
            ...wdio.configs.recommended.rules,
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },

    eslintConfigPrettier,
];