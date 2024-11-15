// REF https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js

/** @type {import("eslint").Linter.LegacyConfig} */
const config = {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",

    // TODO: investigate why this is causing an error
    // Error while loading rule '@typescript-eslint/no-unused-expressions':
    // Cannot read properties of undefined (reading 'allowShortCircuit')
    "@typescript-eslint/no-unused-expressions": "off",
  },
  overrides: [
    {
      files: ["*.mdx"],
      extends: "plugin:mdx/recommended",
      rules: {
        "react/jsx-no-undef": "off",
      },
    },
  ],
  settings: {
    tailwindcss: {
      callees: ["cn"],
    },
  },
}

module.exports = config
