import { allPosts, type Post } from "contentlayer/generated"
import { getPlaiceholder } from "plaiceholder"

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

/**
 * Generate Cloudinary signature component for a given URL. Requires the `CLOUDINARY_API_SECRET` environment variable to be set.
 *
 * @param url - Cloudinary delivery URL without the base (e.g. w_300,h_250,e_grayscale/sample.png)
 *
 * @return Signature component for the URL (e.g. s--Kjba5B8k--).
 *
 * @see https://cloudinary.com/documentation/advanced_url_delivery_options#generating_delivery_url_signatures
 */
export async function generateSignature(url: string): Promise<string> {
  const appendedUrl = url + process.env.CLOUDINARY_API_SECRET

  // convert the data to UTF-8 encoded bytes
  const data = new TextEncoder().encode(appendedUrl)

  // generate SHA-256 hash of the data
  const hash = await crypto.subtle.digest("SHA-256", data)

  // convert the hash to a base64-encoded string
  const base64 = Buffer.from(hash).toString("base64")

  const urlSafe = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")

  const formattedSignature = `s--${urlSafe.slice(0, 8)}--`

  return formattedSignature
}

export async function signImage(transforms: string, publicId: string) {
  const base = "https://res.cloudinary.com/tifan"

  const signature = await generateSignature([transforms, publicId].join("/"))

  return [base, signature, transforms, publicId].join("/")
}

/**
 * Get the image height and base64-encoded placeholder for a given remote image URL.
 */
export async function getImage(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    )

    const {
      metadata: { height },
      base64,
    } = await getPlaiceholder(buffer, { size: 10 })

    return {
      height,
      base64,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Cannot read image from source:\n\n${src}\n\nMake sure the URL is correct.`,
      )
    }

    throw error
  }
}
