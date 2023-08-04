import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { allPosts } from "contentlayer/generated"

import { UpstashRedisRestResponse } from "./types"

export const config = {
  matcher: "/blog/:path*",
}
export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop() as string
  const posts = allPosts.map((post) => post.slug)

  if (!posts.includes(slug) || slug === "blog") {
    return NextResponse.next({
      headers: {
        "X-Middleware": "skipped",
      },
    })
  }

  // create a hash of the IP address
  const data = new TextEncoder().encode(req.ip)
  const buf = await crypto.subtle.digest("SHA-256", data)
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  const url = new URL(process.env.UPSTASH_REDIS_REST_URL).origin
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  const isNew = await fetch(
    `${url}/SET/dedup:${hash}:${slug}/true/NX/EX/86400`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json() as Promise<UpstashRedisRestResponse>)

  if (isNew.result) {
    await fetch(`${url}/INCR/pageviews:blog:${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return NextResponse.next({
    headers: {
      "X-Middleware": isNew.result ? "pageviews incremented" : "still new",
    },
  })
}
