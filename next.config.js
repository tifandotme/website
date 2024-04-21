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

if (process.env.NODE_ENV === "development") {
  config.headers = async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ]
  }
}

export default withPlaiceholder(config)
