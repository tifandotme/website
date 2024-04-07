import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import React from "react"
import { CopyButton } from "./copy"

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
  Full: ({ children }) => {
    if (React.Children.count(children) !== 1) {
      throw new Error("`Full` component must wrap an element")
    }

    return React.cloneElement(React.Children.only(children), {
      className: "!col-span-full",
    })
  },
  // Img: ({
  //   bleed = false,
  //   caption,
  //   ...props
  // }: {
  //   bleed?: boolean
  //   caption?: string
  // } & ImageProps) => {
  //   return (
  //     <figure className={cn(bleed ? "!col-span-full" : "justify-self-center")}>
  //       <CldImage
  //         className="rounded-lg border"
  //         sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 75vw, (max-width: 1440px) 60vw, 53vw"
  //         {...props}
  //       />

  //       {caption && (
  //         <figcaption className="text-center text-sm text-muted">
  //           {caption}
  //         </figcaption>
  //       )}
  //     </figure>
  //   )
  // },
}
