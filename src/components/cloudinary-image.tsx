import Image, { type ImageProps } from "next/image"

import { getImage, signImage } from "@/lib/utils"

export async function CldImage({
  aspectRatio,
  ...props
}: { aspectRatio?: string } & ImageProps) {
  const { src, alt, width, height } = props
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

  const signedImage = await signImage(transforms[aspectRatio ? 0 : 1], publicId)

  const signedPlaceholder = await signImage(transforms[2], publicId)

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
      quality={85}
    />
  )
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
