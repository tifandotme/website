import Link from "next/link"
import { allPosts } from "contentlayer/generated"

export function PostList({ showDrafts = false }: { showDrafts?: boolean }) {
  const posts = allPosts
    .filter((post) => {
      if (showDrafts) {
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

        // XXX: JS will add Temporal in the future
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
            className="mb-6 rounded-xl border p-5 last:mb-0 hover:bg-neutral-100 hover:transition active:scale-[.98] dark:hover:bg-neutral-900"
          >
            <h3 className="mb-1 line-clamp-3 font-sans text-xl font-medium">
              {post.title}
            </h3>
            <time
              dateTime={post.date}
              className="whitespace-nowrap font-mono font-medium text-muted"
            >
              {formattedDate}
            </time>
            {post.description && (
              <p className="mt-5 line-clamp-3">{post.description}</p>
            )}
          </Link>
        )
      })}
    </article>
  )
}
