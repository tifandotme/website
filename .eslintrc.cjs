// REF https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js

// NOTE the old config system will be deprecated in v9.0.0 in favor of flat config:
// https://eslint.org/blog/2022/08/new-config-system-part-2/

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "prefer-const": "error",
    "no-undef": "off",
    "@next/next/no-html-link-for-pages": "off",
    "tailwindcss/classnames-order": "off",
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
      whitelist: ["no-js"],
    },
  },
}

module.exports = config
