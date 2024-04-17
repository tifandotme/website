import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import type { ImageProps } from "next/image"
import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"
import React, { type ComponentProps } from "react"
import {
  QuotedTweet,
  TweetActions,
  TweetBody,
  TweetHeader,
  TweetInReplyTo,
  TweetInfo,
  TweetMedia,
  TweetReplies,
  TweetContainer as _TweetContainer,
  enrichTweet,
  type TwitterComponents,
} from "react-tweet"
import { getTweet } from "react-tweet/api"
import { cn } from "../utils"
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
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occured")
      return null
    }
  },
  Tweet: async ({ id }: { id: string }) => {
    try {
      const TweetContainer = (
        props: ComponentProps<typeof _TweetContainer>,
      ) => (
        <_TweetContainer
          className={cn(
            "not-prose justify-self-center !transition-none [--tweet-bg-color-hover:hsl(var(--muted-large-text)/.025)] [--tweet-bg-color:transparent] [--tweet-border:1px_solid_hsl(var(--border))] [--tweet-color-blue-secondary-hover:hsl(var(--muted-large-text)/.05)] [--tweet-quoted-bg-color-hover:hsl(var(--muted-large-text)/.05)] [&_*]:!transition-none",
            props.className,
          )}
          {...props}
        />
      )

      const t = await getTweet(id)
      if (!t) {
        return (
          <TweetContainer>
            <div className="flex flex-col items-center py-3">
              <p className="text-xl">Tweet not found</p>
            </div>
          </TweetContainer>
        )
      }

      const tweet = enrichTweet(t)
      const components: TwitterComponents = {
        AvatarImg: (props) => <Image {...props} alt="Avatar" unoptimized />,
        MediaImg: (props) => <Image {...props} alt="Avatar" unoptimized fill />,
      }

      return (
        <TweetContainer>
          <TweetHeader tweet={tweet} components={components} />
          {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
          <TweetBody tweet={tweet} />
          {tweet.mediaDetails?.length ? (
            <TweetMedia tweet={tweet} components={components} />
          ) : null}
          {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
          <TweetInfo tweet={tweet} />
          <TweetActions tweet={tweet} />
          <TweetReplies tweet={tweet} />
        </TweetContainer>
      )
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occured")
      return null
    }
  },
}
