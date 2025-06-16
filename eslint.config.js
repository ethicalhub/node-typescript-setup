// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';


export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
   {
    rules: {
      'no-console': 'error', // ❌ Error on any console.log
    },
  },

  {
     ignores: ['dist/**', 'node_modules/**'],
  }
);
