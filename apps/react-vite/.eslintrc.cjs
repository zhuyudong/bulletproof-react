/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: [
    'node_modules/*',
    'public/mockServiceWorker.js',
    'generators/*'
  ],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['check-file', 'unused-imports'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'react': { version: 'detect' },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: [
              'tsconfig.json',
              'packages/react-query-auth/tsconfig.json'
            ]
          }
        }
      },
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:vitest/legacy-recommended',
        'plugin:prettier/recommended'
      ],
      plugins: ['unused-imports'],
      rules: {
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              // disables cross-feature imports:
              // eg. src/features/sim-resources should not import from src/features/sim-images, etc.
              {
                target: './src/features/auth',
                from: './src/features',
                except: ['./auth']
              },
              {
                target: './src/features/users',
                from: './src/features',
                except: ['./users']
              },
              // enforce unidirectional codebase:
              // e.g. src/app can import from src/features but not the other way around
              {
                target: './src/features',
                from: './src/app'
              },
              // e.g src/features and src/app can import from these shared modules but not the other way around
              {
                target: [
                  './src/components',
                  './src/hooks',
                  './src/lib',
                  './src/types',
                  './src/utils'
                ],
                from: ['./src/features', './src/app']
              }
            ]
          }
        ],
        'import/no-cycle': 'error',
        'linebreak-style': ['error', 'unix'],
        'import/order': [
          'error',
          {
            'groups': [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object'
            ],
            'newlines-between': 'always',
            'alphabetize': { order: 'asc', caseInsensitive: true }
          }
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        // 'import/resolver': {
        //   typescript: {
        //     project: [
        //       'tsconfig.json',
        //       'packages/react-query-auth/tsconfig.json'
        //     ]
        //   },
        //   node: {
        //     project: [
        //       'tsconfig.json',
        //       'packages/react-query-auth/tsconfig.json'
        //     ]
        //   }
        // },
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-unknown-property': ['off'],
        'react-hooks/exhaustive-deps': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/anchor-has-content': ['off'],
        'jsx-a11y/heading-has-content': ['off'],
        '@typescript-eslint/no-unused-vars': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false
          }
        ], // Ensure `import type` is used when it's necessary
        '@typescript-eslint/no-unused-expressions': 'off', // Allow usage of unused expressions
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: true,
            classes: true,
            variables: true,
            enums: true,
            typedefs: true
          }
        ], // Allow usage of variables before they are defined
        '@typescript-eslint/ban-ts-comment': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'check-file/filename-naming-convention': [
          'error',
          {
            '**/*.{ts,tsx}': 'KEBAB_CASE'
          },
          {
            ignoreMiddleExtensions: true
          }
        ],
        'tailwindcss/no-custom-classname': 'off'
      }
    },
    {
      plugins: ['check-file'],
      files: ['src/**/!(__tests__)/*'],
      rules: {
        'check-file/folder-naming-convention': [
          'error',
          {
            '**/*': 'KEBAB_CASE'
          }
        ]
      }
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      plugins: ['jest', 'jest-formatting', 'testing-library', 'jest-dom'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-formatting/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended'
      ]
    },
    {
      files: ['**/*.spec.ts', 'e2e/**/*.ts'],
      extends: ['plugin:playwright/recommended'],
      rules: {
        'testing-library/prefer-screen-queries': 'off'
      }
    },
    {
      files: ['*.stories.*'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true
          }
        ]
      }
    },
    {
      files: ['*.html'],
      plugins: ['html']
    },
    {
      files: ['*.yaml', '*.yml'],
      plugins: ['yml'],
      extends: ['plugin:yml/standard']
    },
    {
      files: ['*.md', '*.mdx'],
      extends: ['plugin:mdx/recommended'],
      rules: {
        'no-unused-expressions': 'off',
        'react/jsx-curly-brace-presence': 'error',
        'react/jsx-no-undef': 'warn',
        'react/jsx-sort-props': 'error',
        'react/no-unescaped-entities': 'warn',
        'react/self-closing-comp': 'off',
        'jsx-a11y/alt-text': 'off',
        '@next/next/no-img-element': 'off'
      }
    },
    {
      files: ['**/*.{md,mdx}/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'no-magic-numbers': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off' // Named export is easier to refactor automatically
      }
    }
  ]
}
