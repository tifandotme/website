import withPlaiceholder from "@plaiceholder/next"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
    loader: "custom",
    loaderFile: "./app/loader.js",
  },
}

export default withPlaiceholder(config)
