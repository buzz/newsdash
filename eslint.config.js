import { fixupPluginRules } from '@eslint/compat'
import eslintJs from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRedux from 'eslint-plugin-react-redux'
import eslintPluginRegexp from 'eslint-plugin-regexp'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const groupWithTypes = (/** @type {string} */ re) => [re, `${re}.*\\u0000$`]

export default tsEslint.config(
  // plugins

  {
    plugins: {
      import: fixupPluginRules(eslintPluginImport),
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': eslintPluginReactHooks,
      react: eslintPluginReact,
      'react-redux': fixupPluginRules(eslintPluginReactRedux),
      regexp: eslintPluginRegexp,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },

  // extends

  eslintJs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginRegexp.configs['flat/recommended'],

  // base config

  {
    languageOptions: {
      globals: globals.es2021,
      parserOptions: {
        project: [
          'tsconfig.json',
          'packages/client/tsconfig.json',
          'packages/server/tsconfig.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...eslintPluginImport.configs.typescript.rules,

      // Enforce all block statements to be wrapped in curly braces
      curly: 'error',

      // disable as we're using @typescript-eslint/no-restricted-imports
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useDispatch', 'useStore'],
              message:
                'Use typed hooks `useDispatch`, `useSelector`, and `useStore` from app instead.',
            },
            {
              name: '@reduxjs/toolkit',
              importNames: ['createSlice'],
              message: 'Use extended `createSlice` from app instead.',
            },
          ],
        },
      ],

      // TypeScript provides the same checks
      // https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      // Import order setup
      'import/first': 'error',
      'import/no-duplicates': 'error',

      'prettier/prettier': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          // custom groups with type imports last in each group
          // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          groups: [
            [String.raw`^\u0000`], // side-effects
            groupWithTypes('^node:'), // node modules
            groupWithTypes(String.raw`^@?(?:(?!newsdash\/))\w`), // 3rd party imports
            groupWithTypes(String.raw`^@newsdash\/`),
            [String.raw`(?<!\u0000)$`], // absolute imports
            groupWithTypes('^#'), // ts paths exports
            groupWithTypes(String.raw`^\.`), // relative imports
            [String.raw`\.module\.css$`], // css modules
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Prefer interfaces for type definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // Consistent use of type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
        },
      ],
      // Indentation is handled by prettier (https://typescript-eslint.io/rules/indent/)
      '@typescript-eslint/indent': 'off',
      // Needed for Redux, e.g. `builder.query<VersionInfo, void>(...)`
      // https://github.com/typescript-eslint/typescript-eslint/issues/8113
      '@typescript-eslint/no-invalid-void-type': 'off',
      // Allow number type in template literal strings
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      // Allow `while(true)`, etc.
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      // Produces false positives
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  // Client

  {
    files: ['packages/client/src/**/*.ts', 'packages/client/src/**/*.tsx'],
    languageOptions: { globals: globals.browser },
    rules: {
      'import/extensions': ['error', { css: 'always', json: 'always', svg: 'always', ts: 'never' }],
    },
  },
  {
    files: ['packages/client/src/**/*.tsx'],
    settings: { react: { version: 'detect' } },
    rules: {
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      ...eslintPluginReactRedux.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },

  // Node

  {
    files: ['packages/server/src/**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      'import/extensions': ['error', { json: 'always', js: 'always' }],
    },
  },

  // Configuration files

  {
    files: [
      'eslint.config.js',
      'packages/client/postcss.config.js',
      'packages/client/vite.config.ts',
    ],
    extends: [tsEslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },

  // Ignore patterns

  {
    ignores: ['**/dist/*'],
  },

  eslintPluginPrettierRecommended
)
