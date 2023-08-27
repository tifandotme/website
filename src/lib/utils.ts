import { type Post } from "contentlayer/generated"

/**
 * In-house replacement for clsx, inspired from https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
 */
export function cn(...args: unknown[]): string | undefined {
  return (
    args
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || undefined
  )
}

/**
 * Calls the `/api/views` endpoint to get the view count for a post
 */
export async function getViews(slug: string) {
  const origin = window.location.origin
  const pathname = `/api/views/${slug}`

  const url = new URL(pathname, origin)

  const res = await fetch(url)

  if (!res.ok) {
    console.error("Failed to fetch views (/api/views) for slug:", slug)
  }

  return res.json() as Promise<{
    views: number | null
  }>
}

/**
 * Calls the `/api/views` endpoint to increment the view count for a post
 */
export async function incrementViews(slug: string) {
  const origin = window.location.origin
  const pathname = `/api/views/${slug}?incr`

  const url = new URL(pathname, origin)

  const res = await fetch(url)

  if (!res.ok) {
    console.error("Failed to increment views (/api/views) for slug:", slug)
  }

  return res.json() as Promise<{
    views: number
  }>
}

/**
 * Get the last modified date of a post from GitHub API to be used in OG modified time
 */
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

  if (!res.ok) {
    console.error("Failed to fetch last modified date from GitHub API")
    return
  }

  const json = (await res.json()) as {
    commit: {
      committer: {
        date: string
      }
    }
  }[]

  return json[0]?.commit.committer.date
}
