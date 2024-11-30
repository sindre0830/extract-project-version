"use strict";

const tsParser = require("@typescript-eslint/parser");

module.exports = [
    {
        name: "global-ignores",
        ignores: ["lib/**", "dist/**", "config/jest.config.js"],
    },
    {
        name: "typescript-eslint",
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            ecmaVersion: 9,
            sourceType: "module",
            parser: tsParser,
            parserOptions: {
                project: "./config/tsconfig.eslint.json",
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            "eslint-comments/no-use": "off",
            "import/no-namespace": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/array-type": "error",
            "@typescript-eslint/await-thenable": "error",
            "camelcase": "off",
            "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
            "@typescript-eslint/no-array-constructor": "error",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-extraneous-class": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/no-useless-constructor": "error",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/prefer-for-of": "warn",
            "@typescript-eslint/prefer-function-type": "warn",
            "@typescript-eslint/prefer-includes": "error",
            "@typescript-eslint/prefer-string-starts-ends-with": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/require-array-sort-compare": "error",
            "@typescript-eslint/restrict-plus-operands": "error",
            "semi": "off",
            "@typescript-eslint/unbound-method": "error",
            "i18n-text/no-en": "off",
        },
    },
    {
        name: "jest-tests",
        files: ["**/*.test.js", "**/*.spec.js"],
        plugins: {
            jest: require("eslint-plugin-jest"),
        },
        env: {
            "jest/globals": true,
        },
    },
    {
        name: "node-environment",
        files: ["**/*.js"],
        env: {
            node: true,
            es6: true,
        },
    },
];
