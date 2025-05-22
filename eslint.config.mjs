import globals from "globals";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { 
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh, }, 
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
]);
