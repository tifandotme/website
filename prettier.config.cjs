// prettier 3.0 will introduce config changes

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
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
  semi: false,
  trailingComma: "all",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
}

module.exports = config
