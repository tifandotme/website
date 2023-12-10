import withPlaiceholder from "@plaiceholder/next"

import "./src/env.js"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

export default withPlaiceholder(config)
