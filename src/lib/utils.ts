import { allPosts } from "contentlayer/generated"

import { type UpstashRedisRestResponse } from "@/types"

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
  const url = new URL(process.env.UPSTASH_REDIS_REST_URL).origin
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  const res = await fetch(`${url}/GET/pageviews:blog:${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60, // 1 minute
    },
  }).then((res) => res.json() as Promise<UpstashRedisRestResponse>)

  return res.result ?? 0
}
