import { allPosts, type Post } from "contentlayer/generated"

/**
 * Utility function that allows for conditional classnames and also merges tailwind classes
 */
// export function cn(...inputs: ClassValue[]): string {
//   return twMerge(clsx(inputs));
// }

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}
