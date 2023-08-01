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
