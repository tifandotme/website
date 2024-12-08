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
  pre: ({ raw, children, ...props }) => {
    return (
      <pre {...props}>
        {children}
        <CopyButton text={raw} />
      </pre>
    )
  },
  Image: async ({
    caption,
    width = 768,
    src: publicId,
    alt,
    className,
    ...props
  }: {
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
            width >= 768 ?
              "!col-span-full [&_img]:w-full"
            : "justify-self-center",
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
          {tweet ?
            <EmbeddedTweet tweet={tweet} components={components} />
          : <TweetContainer className="flex flex-col items-center py-3">
              <p className="text-[1.0625rem]">Tweet not found</p>
            </TweetContainer>
          }
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
