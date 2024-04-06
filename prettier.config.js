/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["cn"],
  tailwindAttributes: ["className", "class"],
}

/** @type {import("prettier").Options} */
const config = {
  semi: false,

  ...tailwindConfig,

  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
