import { ImageProps } from "next/image"
import cn from "clsx"
import { type MDXComponents } from "mdx/types"

import { CldImage } from "@/components/image"

// XXX: .mdx doesn't have intellisense
export const components: MDXComponents = {
  Img: ({
    bleed = false,
    caption,
    ...props
  }: {
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <figure className={cn(bleed ? "!col-span-full" : "justify-self-center")}>
        <CldImage className="rounded-lg border" {...props} />

        {caption && (
          <figcaption className="text-center text-sm text-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },
}
