import dynamic from "next/dynamic"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"

import { LoadingDots } from "@/components/loading-dots"

const Views = dynamic(() => import("@/components/client/views"), {
  loading: () => <LoadingDots />,
  ssr: false,
})

export function PostList({ draft = false }: { draft?: boolean }) {
  const posts = allPosts
    .filter((post) => {
      if (draft) {
        return post.draft
      } else {
        return !post.draft
      }
    })
    .sort((a, b) => new Intl.Collator().compare(b.date, a.date))

  return (
    <article className="mx-auto flex max-w-screen-sm flex-col">
      {posts.map((post) => {
        const postYear = new Date(post.date).getFullYear()
        const currentYear = new Date().getFullYear()

        // NOTE: JS will add Temporal in the future
        let options: Intl.DateTimeFormatOptions

        // if the post is not from the current year, show the full date
        if (postYear < currentYear || postYear > currentYear) {
          options = { dateStyle: "medium" }
        } else {
          options = { month: "short", day: "numeric" }
        }

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          new Date(post.date),
        )

        return (
          <Link
            key={post.url}
            href={post.url}
            className="mb-10 rounded-xl border p-5 last:mb-0 hover:bg-neutral-100 hover:transition active:scale-[.98] dark:hover:bg-neutral-900"
          >
            <h3 className="mb-1 line-clamp-3 font-sans text-xl font-medium">
              {post.title}
            </h3>
            <div className="inline-flex gap-3 font-mono font-medium text-muted">
              <time dateTime={post.date} className="whitespace-nowrap">
                {formattedDate}
              </time>
              {!post.draft && (
                <>
                  <span
                    className="select-none text-[0.7rem] leading-6 text-muted-darker"
                    aria-hidden
                  >
                    &bull;
                  </span>
                  <span>
                    <Views slug={post.slug} /> views
                  </span>
                </>
              )}
            </div>
            {post.description && (
              <p className="mt-5 line-clamp-3">{post.description}</p>
            )}
          </Link>
        )
      })}
    </article>
  )
}
