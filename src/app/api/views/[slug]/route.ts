import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { allPosts } from "contentlayer/generated"

import { site } from "@/config"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  enableTelemetry: false,
})

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug
  const incr = req.nextUrl.searchParams.get("incr")

  // #region disallow direct access
  const referer = req.headers.get("referer")
  const allowedReferers = ["http://localhost:3000", site.baseUrl]
  if (!referer || !allowedReferers.includes(new URL(referer).origin)) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    )
  }
  // #endregion

  const posts = allPosts.map((post) => post.slug)
  if (!posts.includes(slug)) {
    return NextResponse.json(
      {
        message: "Unknown post",
      },
      { status: 400, statusText: "Unknown post" },
    )
  }

  if (incr !== null) {
    const views = await redis.hincrby("views", slug, 1)

    return NextResponse.json({
      views,
    })
  }

  const views = await redis.hget<number>("views", slug)

  return NextResponse.json({
    views,
  })
}

// deduplication logic, but i'm not sure if it's needed
//
// const data = new TextEncoder().encode(req.ip)
// const buf = await crypto.subtle.digest("SHA-256", data)
// const hash = Array.from(new Uint8Array(buf))
//   .map((b) => b.toString(16).padStart(2, "0"))
//   .join("")

// const isNew = await redis.set(`dedup:${hash}:${slug}`, true, {
//   nx: true,
//   ex: 60 * 60, // optimally 1h
// })
