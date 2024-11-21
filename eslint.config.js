import prettier from 'eslint-config-prettier'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],
    prettier,
    ...svelte.configs['flat/prettier'],
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,svelte}'],
        rules: {
            'no-console': 'error',
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        plugins: {
            svelte: svelte,
        },
        files: ['**/*.svelte', '*.svelte'],

        languageOptions: {
            parserOptions: {
                parser: ts.parser,
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: false,
                },
            }
        }
    },
    {
        ignores: ['build/', '.svelte-kit/', 'dist/']
    },
    prettierRecommended,
)
