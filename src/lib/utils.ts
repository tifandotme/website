import { allPosts, type Post } from "contentlayer/generated"

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}
