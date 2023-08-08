import { allPosts } from "contentlayer/generated"

export function getPost(slug: string) {
  return allPosts.find((post) => post.slug === slug)
}

// REF: https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
export function cn(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim()
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
