// eslint.config.js
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            'no-console': 'error',
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            quotes: ['error', 'single', { allowTemplateLiterals: true }]
        }
    },

    {
        ignores: ['dist/**', 'node_modules/**']
    }
)
