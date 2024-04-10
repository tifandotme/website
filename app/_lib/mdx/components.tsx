import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import type { ImageProps } from "next/image"
import Image from "next/image"
import React from "react"
import { cn } from "../utils"
import { CopyButton } from "./copy"
import { getImageData } from "./plaiceholder"

type MDXComponents = MDXRemoteProps["components"]

export const components: MDXComponents = {
  // @ts-ignore
  pre: ({ children, raw, ...props }) => {
    return (
      <pre {...props}>
        {children}
        <CopyButton text={raw} />
      </pre>
    )
  },
  /**
   * Post content is part of a grid system, so individual elements such as `p`
   * or `h2` is a grid item. By wrapping an element with this component, it will
   * span the full width.
   */
  Full: ({ children }: React.PropsWithChildren) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        className: cn(children.props.className, "!col-span-full"),
      })
    }
    if (React.Children.count(children) > 1) {
      React.Children.only(null)
    }
    return null
  },
  Image: async ({
    caption,
    src: publicId,
    width = 768,
    className,
    alt,
    ...props
  }: {
    caption?: string
  } & ImageProps) => {
    const { height } = await getImageData(
      `https://res.cloudinary.com/tifan/c_limit,w_${width},q_1,f_webp/${publicId}`,
    )
    const { base64 } = await getImageData(
      `https://res.cloudinary.com/tifan/t_placeholder/${publicId}`,
    )

    return (
      <figure className={cn("justify-self-center", className)}>
        <Image
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={base64}
          alt={alt}
          src={publicId}
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 75vw, (max-width: 1440px) 60vw, 53vw"
          {...props}
        />

        {caption && (
          <figcaption className="text-center text-sm text-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },
}
