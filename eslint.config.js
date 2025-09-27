import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    ignores: ["tests/**", "coverage/**", "public/**", "**/lcov-report/**"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        process: "readonly"
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "off"
    }
  }
];