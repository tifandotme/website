import type { ImageProps } from "next/image"
import type { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer/hooks"

import { cn } from "@/lib/utils"
import { CldImage } from "@/components/cloudinary-image"

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
        <CldImage
          className="rounded-lg border"
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

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Content = useMDXComponent(code)

  return <Content components={components} />
}
