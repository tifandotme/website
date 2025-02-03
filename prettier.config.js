/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["cn"],
  tailwindAttributes: ["className", "class"],
  tailwindStylesheet: "./app/globals.css",
}

/** @type {import("prettier").Options} */
const config = {
  semi: false,
  experimentalTernaries: true,

  ...tailwindConfig,

  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
