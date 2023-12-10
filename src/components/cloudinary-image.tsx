import Image, { type ImageProps } from "next/image"
import { getPlaiceholder } from "plaiceholder"

import { cn } from "@/lib/utils"

interface CldImageProps extends ImageProps {
  aspectRatio?: string
}

/**
 * Fetches remote image from Cloudinary. If the image fails to load, a placeholder is shown instead.
 *
 * @param src - Cloudinary public ID (e.g. "projects/puri.png")
 * @param alt - Image alt text
 * @param width - Image width in pixels
 * @param aspectRatio - Image aspect ratio (e.g. "16:9") (optional)
 * @param sizes - Image sizes attribute (e.g. "100vw") (optional)
 *
 * @return Next.js Image component
 */
export async function CldImage({ aspectRatio, ...props }: CldImageProps) {
  try {
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
      `c_fill,ar_${aspectRatio},w_${width},g_auto/q_auto/f_webp`, // crop if aspect ratio is provided
      `c_limit,w_${width}/q_auto/f_webp`,
      `c_scale,w_100/e_blur:1000/q_1/f_webp`,
    ] as const

    // prettier-ignore
    const signedImage = await generateSignedImage(transforms[aspectRatio ? 0 : 1], publicId)
    const { height: calculatedHeight } = await getImage(signedImage)

    const signedPlaceholder = await generateSignedImage(transforms[2], publicId)
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
        sizes={sizes ?? "100vw"} // its recommended to pass the "sizes" prop to make the image responsive.
      />
    )
  } catch (err) {
    console.error(err)

    return (
      <div
        {...props}
        className={cn(
          props.className,
          "!flex items-center justify-center !bg-[hsl(var(--foreground)/10%)] dark:!bg-[hsl(var(--foreground)/4%)]",
        )}
        style={{
          aspectRatio: aspectRatio ? aspectRatio.replace(":", "/") : "1/1",
        }}
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 282.7 228"
          fill="currentColor"
          className="fill-[hsl(var(--muted-large-text))]"
          width="50%"
          height="50%"
        >
          <circle cx={115.305} cy={35.745} r={35.75} />
          <path d="M188.705 227.995h-81.34c-10.27 0-16.24-11.86-10.28-20.41l38.69-55.48 42.65-61.2a12.465 12.465 0 0 1 20.56 0l42.64 61.17 38.7 55.51c5.96 8.55-.02 20.4-10.28 20.4h-81.34v.01Z" />
          <path d="m2.485 206.785 55.44-78.81c4.27-6.07 12.64-7.54 18.72-3.29l112.83 78.81c10.8 7.54 5.46 24.51-7.71 24.51H13.495c-10.91-.01-17.29-12.3-11.01-21.22Z" />
        </svg>
      </div>
    )
  }
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
  const appendedUrl = url + process.env.CLOUDINARY_API_SECRET

  // create a SHA-256 hash of the URL and API secret
  const data = new TextEncoder().encode(appendedUrl)
  const hash = await crypto.subtle.digest("SHA-256", data)
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
  const res = await fetch(src, {
    next: {
      revalidate: false, // always use the cached version
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${src}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())

  const {
    metadata: { height },
    base64,
  } = await getPlaiceholder(buffer, { size: 10 })

  // WARN: DO NOT declare this function (getImage) along with other functions that might run on the client, because plaiceholder uses sharp which cannot be run on the browser. Or else you'll get this error: "ReferenceError: require is not defined". However, this might change in the future: https://github.com/lovell/sharp/pull/3522

  return {
    height,
    base64,
  }
}
