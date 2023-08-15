import { allPosts, type Post } from "contentlayer/generated"

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

// REF: https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
export function cn(...args: unknown[]): string | undefined {
  return (
    args
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || undefined
  )
}

export async function getViews(slug: string) {
  const origin = window.location.origin
  const pathname = `/api/views/${slug}`

  const url = new URL(pathname, origin)

  return fetch(url).then((res) => res.json()) as Promise<{
    views: number | null
  }>
}

export async function incrementViews(slug: string) {
  const origin = window.location.origin
  const pathname = `/api/views/${slug}?incr`

  const url = new URL(pathname, origin)

  return fetch(url).then((res) => res.json()) as Promise<{
    views: number
  }>
}

export async function getLastModified(post: Post) {
  if (process.env.VERCEL_ENV !== "production") return
  if (post._raw.sourceFileDir.startsWith("blog/draft")) return

  const path = encodeURIComponent(`content/${post._raw.sourceFilePath}`)
  const url = `https://api.github.com/repos/tifandotme/website/commits?per_page=1&path=${path}`

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  const json = (await res.json()) as {
    commit: {
      committer: {
        date: string
      }
    }
  }[]

  const date = json[0]?.commit.committer.date

  return date
}
