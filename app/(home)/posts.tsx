"use client"

import Link from "next/link"
import React from "react"
import { Icon } from "../_components/icon"
import { Views } from "../_components/views"
import { getAllPosts } from "../_lib/blog"
import { cn, formatDateDynamic } from "../_lib/utils"

type Post = Awaited<ReturnType<typeof getAllPosts>>[number]

interface PostsProps {
  posts: Post[]
}

export function Posts({ posts }: PostsProps) {
  const [isEnglishOnly, setIsEnglishOnly] = React.useState<boolean | null>(null)

  return (
    <>
      <div className="container-md mb-1">
        <button
          className="-mx-2 flex cursor-default items-center gap-1 px-2 py-2.5 text-muted hover:text-foreground"
          type="button"
          role="switch"
          aria-checked={isEnglishOnly ?? false}
          onClick={() => {
            setIsEnglishOnly((prev) => !prev)
          }}
        >
          <span
            className="relative inline-flex items-center justify-center"
            aria-hidden="true"
          >
            <Icon id="box" className="size-4" />
            {isEnglishOnly && <Icon id="check" className="absolute size-3.5" />}
          </span>
          English Only
        </button>
      </div>

      <ul className="container-md">
        {posts.map((post) => (
          <li
            key={post.slug}
            className={cn(
              "mb-2 last:mb-0",
              isEnglishOnly && post.lang !== "en" && "hidden",
            )}
          >
            <Link
              className="relative -mx-4 flex flex-col gap-2 p-4 hover:bg-muted-darker/10 active:bg-muted-darker/10 sm:-mx-3 sm:p-3"
              href={post.url}
            >
              <div className="flex flex-col justify-between md:flex-row md:items-start md:gap-2">
                <h2 className="text-[105%] font-semibold leading-7">
                  {post.title}
                </h2>
                <span className="inline-flex items-center gap-5 leading-7 text-muted-darker md:flex-row-reverse">
                  <time
                    className="whitespace-nowrap "
                    dateTime={post.publishedAt}
                  >
                    {formatDateDynamic(post.publishedAt)}
                  </time>
                  <Views className="no-js" slug={post.slug} />
                </span>
              </div>
              <p className="text-muted">
                <em>{post.description}</em>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
