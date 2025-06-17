// eslint.config.js
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                // ✅ Define Node.js globals manually
                process: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
                console: 'readonly'
            }
        },

        rules: {
            // 'no-console': 'error',
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            quotes: ['error', 'single', { allowTemplateLiterals: true }]
        }
    },

    {
        ignores: ['dist/**', 'node_modules/**']
    }
)
