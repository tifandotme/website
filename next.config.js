import withPlaiceholder from "@plaiceholder/next"

import "./src/env.js"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  // experimental: {
  //   mdxRs: false, // suggested by https://rehype-pretty-code.netlify.app/
  // },
}

export default withPlaiceholder(config)
