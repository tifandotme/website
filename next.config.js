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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    loader: "custom",
    loaderFile: "./app/loader.js",
  },
}

export default withPlaiceholder(config)
