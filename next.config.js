import withPlaiceholder from "@plaiceholder/next"

import "./src/env.js"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  experimental: {
    mdxRs: false, // suggested by https://rehype-pretty-code.netlify.app/
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

export default withPlaiceholder(config)
