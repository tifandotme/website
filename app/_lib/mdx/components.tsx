import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import Image from "next/image"
import React from "react"
import {
  EmbeddedTweet,
  TweetContainer,
  type TwitterComponents,
} from "react-tweet"
import { getTweet } from "react-tweet/api"
import { CloudinaryImage } from "../../_components/cloudinary-image"
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
  Image: CloudinaryImage,
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
