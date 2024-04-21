import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import Image, { type ImageProps } from "next/image"
import { getPlaiceholder } from "plaiceholder"
import React from "react"
import {
  EmbeddedTweet,
  TweetContainer,
  type TwitterComponents,
} from "react-tweet"
import { getTweet } from "react-tweet/api"
import { cn } from "../utils"
import { CopyButton } from "./copy"
import { Sandpack } from "./sandpack"
import styles from "./tweet.module.css"

type MDXComponents = MDXRemoteProps["components"]

export const components: MDXComponents = {
  // @ts-ignore
  pre: ({ raw, children, ...props }) => {
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
    bleed = false,
    caption,
    width = 768,
    src: publicId,
    alt,
    className,
    ...props
  }: {
    bleed?: boolean
    caption?: string
    width?: number
  } & ImageProps) => {
    try {
      const {
        metadata: { height },
      } = await getPlaiceholder(
        Buffer.from(
          await fetch(
            `https://res.cloudinary.com/tifan/$w_${width}/t_1/${publicId}`,
          ).then((res) => res.arrayBuffer()),
        ),
        { size: 10 },
      )

      const { base64 } = await getPlaiceholder(
        Buffer.from(
          await fetch(
            `https://res.cloudinary.com/tifan/t_placeholder/${publicId}`,
          ).then((res) => res.arrayBuffer()),
        ),
        { size: 10 },
      )

      return (
        <figure
          className={cn(
            "mx-[calc(var(--post-padding)*-1)]",
            bleed ? "!col-span-full" : "justify-self-center",
            className,
          )}
        >
          <Image
            width={width}
            height={height}
            placeholder="blur"
            blurDataURL={base64}
            alt={alt}
            src={publicId}
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 75vw, (max-width: 1440px) 60vw, 53vw"
            className="w-full"
            {...props}
          />
          {caption && (
            <figcaption className="text-center text-sm text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occured")
      return null
    }
  },
  Tweet: async ({ id }: { id: string }) => {
    try {
      const tweet = await getTweet(id)
      const components: TwitterComponents = {
        AvatarImg: (props) => (
          <Image {...props} alt="Tweet Avatar" unoptimized />
        ),
        MediaImg: (props) => (
          <Image {...props} alt="Tweet Media" unoptimized fill />
        ),
      }

      return (
        <div className={cn("not-prose flex justify-center", styles.tweet)}>
          {tweet ? (
            <EmbeddedTweet tweet={tweet} components={components} />
          ) : (
            <TweetContainer className="flex flex-col items-center py-3">
              <p className="text-[1.0625rem]">Tweet not found</p>
            </TweetContainer>
          )}
        </div>
      )
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occured")
      return null
    }
  },
  Sandpack: (props: React.ComponentProps<typeof Sandpack>) => {
    return <Sandpack {...props} />
  },
}
