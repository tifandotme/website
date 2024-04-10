import { getPlaiceholder } from "plaiceholder"

/**
 * Get the image height and base64-encoded placeholder of a remote image. Uses `sharp` under the hood.
 *
 * Server-side usage only.
 */
export async function getImageData(src: string) {
  const res = await fetch(src, {
    next: {
      revalidate: false,
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
