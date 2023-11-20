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
  // experimental: {
  //   mdxRs: false, // suggested by https://rehype-pretty-code.netlify.app/
  // },
}

export default withPlaiceholder(config)
