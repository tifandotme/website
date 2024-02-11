import withPlaiceholder from "@plaiceholder/next"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  cleanDistDir: true,
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
  },
}

export default withPlaiceholder(config)
