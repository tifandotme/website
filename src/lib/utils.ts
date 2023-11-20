import { type Post } from "contentlayer/generated"

// REF https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bfs|asdasd
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

  const res = await fetch(url)

  if (!res.ok) {
    console.error("Failed to fetch views (/api/views) for slug:", slug)
  }

  return res.json() as Promise<{
    views: number | null
  }>
}

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

export async function getLastModified(post: Post) {
  if (process.env.VERCEL_ENV !== "production") return
  if (post.draft) return

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

  type CommitsResponse = {
    commit: {
      committer: {
        date: string
      }
    }
  }[]

  const json: CommitsResponse = await res.json()

  return json[0]?.commit.committer.date
}
