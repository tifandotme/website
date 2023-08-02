import Image, { type ImageProps } from "next/image"
import { getPlaiceholder } from "plaiceholder"

export async function CldImage({
  aspectRatio,
  ...props
}: { aspectRatio?: string } & ImageProps) {
  const { src, alt, width, height, sizes } = props
  const publicId = src as string

  if (!src || !alt || !width) {
    throw new Error(
      "Img component is missing one or more of the required props (src, alt, width)",
    )
  } else if (height) {
    throw new Error(
      "Img component should not have a height prop as it is calculated automatically",
    )
  }

  const transforms = [
    `c_fill,ar_${aspectRatio},w_${width},g_auto/q_auto/f_webp`,
    `c_limit,w_${width}/q_auto/f_webp`,
    `c_scale,w_100/e_blur:1000/q_1/f_webp`,
  ] as const

  // prettier-ignore
  const signedImage = await generateSignedImage(transforms[aspectRatio ? 0 : 1], publicId)

  const signedPlaceholder = await generateSignedImage(transforms[2], publicId)

  // get the height of the image
  const { height: calculatedHeight } = await getImage(signedImage)

  // get the base64 string of the placeholder
  const { base64 } = await getImage(signedPlaceholder)

  return (
    <Image
      {...props}
      src={signedImage}
      alt={alt}
      width={width}
      height={calculatedHeight}
      placeholder="blur"
      blurDataURL={base64}
      quality={90} // value above 90 will only increase the file size beyond what was fetched from Cloudinary
      sizes={sizes || "100vw"} // its recommended to pass the "sizes" prop to make the image responsive.
    />
  )
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
async function generateSignature(url: string) {
  if (process.env.CLOUDINARY_API_SECRET === undefined) {
    throw new Error(
      "CLOUDINARY_API_SECRET environment variable is not set. Make sure to set it in your .env file.",
    )
  }

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

async function generateSignedImage(transforms: string, publicId: string) {
  const base = "https://res.cloudinary.com/tifan"

  const signature = await generateSignature([transforms, publicId].join("/"))

  return [base, signature, transforms, publicId].join("/")
}

/**
 * Get the image height and base64-encoded placeholder for a given remote image URL.
 */
async function getImage(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    )

    const {
      metadata: { height },
      base64,
    } = await getPlaiceholder(buffer, { size: 10 })

    // WARN: DO NOT declare this function (getImage) along with other functions that might run on the client, because plaiceholder uses sharp which cannot be run on the browser. Or else you'll get this error: "ReferenceError: require is not defined". However, this might change in the future: https://github.com/lovell/sharp/pull/3522

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

// TODO: add image preview

/*

21/07/2023
I tried the JavaScript SDK, but then went back to URL method for simplicity and zero-dependencies sake.

const image = new CloudinaryImage(
  src,
  {
    cloudName: "tifan",
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  { secure: true, signUrl: true },
)

const imageUrl = image
  .resize(limitFit().width(width))
  .quality("auto")
  .format("auto")
  .toURL()

const placeholderUrl = image
  .resize(limitFit().width(100))
  .quality(1)
  .effect(blur(1000))
  .format("auto")
  .toURL()

*/
