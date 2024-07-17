// REF https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "next/core-web-vitals",
    // "next/typescript", // TODO check if this is needed in Next.js v15
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",
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
