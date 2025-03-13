import { FlatCompat } from "@eslint/eslintrc"
import eslintConfigPrettier from "eslint-config-prettier"
import mdx from "eslint-plugin-mdx"
// import tailwind from "eslint-plugin-tailwindcss"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ...tailwind.configs["flat/recommended"],
  // {
  //   rules: {
  //     "tailwindcss/classnames-order": "off",
  //     "tailwindcss/no-custom-classname": "off",

  //     // Error while loading rule '@typescript-eslint/no-unused-expressions':
  //     // Cannot read properties of undefined (reading 'allowShortCircuit')
  //     "@typescript-eslint/no-unused-expressions": "off",
  //   },
  //   settings: {
  //     tailwindcss: {
  //       callees: ["cn"],
  //     },
  //   },
  // },

  {
    ...mdx.flat,
    rules: {
      "react/jsx-no-undef": "off",
    },
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
    },
  },

  eslintConfigPrettier, // last
]

export default config
