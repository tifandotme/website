// prettier 3.0 will introduce config changes

/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["cn", "clsx"],
  tailwindAttributes: ["className", "class"],
}

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

const config = {
  semi: false,
  trailingComma: "all", // in v3 this will be default
  
  ...importConfig,
  ...tailwindConfig,

  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // must be loaded last: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
  ],

  pluginSearchDirs: false,
}

module.exports = config
