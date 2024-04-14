// REF https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js

// https://github.com/vercel/next.js/pull/64141 (@9 dep plugins is being worked on)

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
