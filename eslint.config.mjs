import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    languageOptions: {
      ecmaVersion: 2020,
    },
  },
]);
