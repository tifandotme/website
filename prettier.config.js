/** @type {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
const importConfig = {
  importOrder: [
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/public(/.*)?$",
    "^@/types(/.*)?$",
    "^@/config(/.*)?$",
    "^@/lib(/.*)?$",
    "^@/hooks(/.*)?$",
    "^@/components/ui(.*)$",
    "^@/components(.*)$",
    "^@/app(.*)$",
    "",
    "^[.]",
  ],
}

/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["cn", "clsx"],
  tailwindAttributes: ["className", "class"],
}

/** @type {import("prettier").Options} */
const config = {
  ...importConfig,
  ...tailwindConfig,

  semi: false,

  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // must be loaded last: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
  ],
}

export default config
