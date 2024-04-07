"use server"

import { getPlaiceholder } from "plaiceholder"

/**
 * @param transforms - Cloudinary transformations (e.g. w_300,h_250,e_grayscale)
 * @param publicId - Cloudinary public ID (e.g. sample.png)
 * @see https://cloudinary.com/documentation/advanced_url_delivery_options#generating_delivery_url_signatures
 */
export async function generateSignedImage(
  transforms: string,
  publicId: string,
) {
  const appendedUrl = `${transforms}/${publicId}${process.env.CLOUDINARY_API_SECRET}`

  // create a SHA-256 hash of the URL and API secret
  const data = new TextEncoder().encode(appendedUrl)
  const hash = await crypto.subtle.digest("SHA-256", data)
  const base64 = Buffer.from(hash).toString("base64")

  const urlSafe = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")

  const base = "https://res.cloudinary.com/tifan"
  const signature = `s--${urlSafe.slice(0, 8)}--`

  return [base, signature, transforms, publicId].join("/")
}

/**
 * Get the image height and base64-encoded placeholder of an image.
 *
 * Server usage only! Because `plaiceholder` uses `sharp` which cannot be run on
 * the browser, or else you'll get this error: "ReferenceError: require is not
 * defined". However, this might change in the future: https://github.com/lovell/sharp/pull/3522
 */
export async function getImageData(src: string) {
  const res = await fetch(src, {
    next: {
      revalidate: false, // always use the cached version
    },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${src}`)
  }

  const {
    metadata: { height },
    base64,
  } = await getPlaiceholder(Buffer.from(await res.arrayBuffer()), { size: 10 })

  return {
    height,
    base64,
  }
}

// // NOTE rate limit for authenticated user is 5000 req/hour
// // https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users

// const headers: HeadersInit =

// export async function getLastModified(post: Post) {
//   try {
//     const path = encodeURIComponent(`content/${post._raw.sourceFilePath}`)
//     const url = `https://api.github.com/repos/tifandotme/website/commits?per_page=1&path=${path}`
//     const res = await fetch(url, {
//       {
//   Accept: "application/vnd.github+json",
//   Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
// },
//     })
//     if (!res.ok) {
//       throw new Error(`Failed to fetch last modified date (${post.slug})`)
//     }

//     const json = await res.json()
//     return (json[0]?.commit?.committer?.date as string) ?? null
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message)
//     }
//     return null
//   }
// }
