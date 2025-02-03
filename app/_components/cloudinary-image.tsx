import "server-only"

import Image, { type ImageProps } from "next/image"
import { getPlaiceholder } from "plaiceholder"

export type CloudinaryImageProps = Omit<
  ImageProps,
  "src" | "height" | "placeholder" | "blurDataURL"
> & {
  publicId: string
  width: number
}

export async function CloudinaryImage({
  publicId,
  width,
  ...props
}: CloudinaryImageProps) {
  try {
    const {
      metadata: { height },
    } = await getPlaiceholder(
      Buffer.from(
        await fetch(
          `https://res.cloudinary.com/tifan/$w_${width}/t_1/${publicId}`,
          { cache: "force-cache" },
        ).then((res) => res.arrayBuffer()),
      ),
      { size: 10 },
    )

    const { base64 } = await getPlaiceholder(
      Buffer.from(
        await fetch(
          `https://res.cloudinary.com/tifan/t_placeholder/${publicId}`,
          { cache: "force-cache" },
        ).then((res) => res.arrayBuffer()),
      ),
      { size: 10 },
    )

    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        src={publicId}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={base64}
        {...props}
      />
    )
  } catch (err) {
    console.error(err instanceof Error ? err.message : "An error occured")
    return null
  }
}
