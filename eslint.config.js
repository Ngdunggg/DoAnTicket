import cspellPlugin from '@cspell/eslint-plugin';
import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import jsoncPlugin from 'eslint-plugin-jsonc';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import sort from 'eslint-plugin-sort';
import tsdoc from 'eslint-plugin-tsdoc';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    js.configs.recommended,
    // {
    //     plugins: { "@cspell": cspellPlugin },
    //     rules: {
    //         "@cspell/spellchecker": [
    //             "error",
    //             {
    //                 configFile: "./cspell.json",
    //             },
    //         ],
    //     },
    // },
    {
        ignores: [
            '**/coverage/',
            '**/dist/',
            '**/node_modules/',
            '*.d.ts',
            'package-lock.json',
            'package.json',
            'cspell.json',
            'src/assets/loading.json',
        ],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                process: 'readonly',
            },
            parser: tseslintParser,
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
                sourceType: 'module',
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslintPlugin,
            prettier,
            react,
            sort,
            tsdoc,
        },
        rules: {
            '@typescript-eslint/consistent-type-exports': [
                'error',
                { fixMixedExportsWithInlineTypeSpecifier: false },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            'import/no-extraneous-dependencies': 'off',
            'import/no-named-as-default': 'off',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'react/jsx-props-no-spreading': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/require-default-props': 'off',
            'sort/destructuring-properties': 'warn',
            'sort/export-members': 'warn',
            'sort/object-properties': 'warn',
            'sort/string-enums': 'warn',
            'sort/type-properties': 'warn',
            'tsdoc/syntax': 'off',
        },
    },
    {
        files: ['**/*.json', '**/*.jsonc'],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            jsonc: jsoncPlugin,
        },
        rules: {
            'jsonc/no-comments': 'off',
            'jsonc/sort-array-values': [
                'error',
                { order: { type: 'asc' }, pathPattern: '^files$' },
                { order: { type: 'asc' }, pathPattern: '^keywords$' },
            ],
            'jsonc/sort-keys': 'error',
        },
    },
    {
        files: ['**/*.{test.ts,test.tsx}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
