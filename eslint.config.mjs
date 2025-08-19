import js from '@eslint/js';
import globals, { jest } from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  // {
  //   files: ['**/*.test.js'],
  //   plugins: { jest },
  //   extends: ['plugin:jest/recommended'],
  // },
  eslintConfigPrettier,
  globalIgnores(['webpack.config.js']),
]);
