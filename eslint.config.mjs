import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],

    // === Rules adjusted to allow the items you listed ===
    rules: {
      // Allow `any` when needed (disable the error)
      "@typescript-eslint/no-explicit-any": "off",

      // Don't error on unused vars; treat as warning and ignore names that start with `_`
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],

      // Allow using plain <img> (disable Next's recommended rule)
      "@next/next/no-img-element": "off",
    },
  },

  // File-scoped override(s) expressed in flat config style (each entry is a separate config object)
  {
    files: ["src/app/admin-login/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
