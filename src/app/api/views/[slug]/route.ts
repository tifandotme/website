import { NextRequest, NextResponse } from "next/server"
import { allPosts } from "contentlayer/generated"

import type { Response } from "@/types"
import { isProd } from "@/lib/utils"

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  const isIncr = req.nextUrl.searchParams.get("incr") !== null

  if (isProd()) {
    const referer = req.headers.get("referer")

    if (!referer) {
      return NextResponse.json<Response>(
        { message: "unauthorized" },
        { status: 401 },
      )
    }
  }

  if (!allPosts.some((post) => post.slug === slug)) {
    return NextResponse.json<Response>(
      { message: "unknown post" },
      { status: 400 },
    )
  }

  try {
    const url = new URL(process.env.UPSTASH_REDIS_REST_URL as string)
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
      body: JSON.stringify(
        isIncr ? ["HINCRBY", "views", slug, 1] : ["HGET", "views", slug],
      ),
    }

    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`failed to fetch upstash api`)
    }

    const result = (await res.json()).result as string | null

    return NextResponse.json<Response>({
      message: "success",
      // in case HGET returns null, it'll be converted to 0
      data: Number(result),
    })
  } catch (error) {
    return NextResponse.json<Response>(
      {
        message: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 },
    )
  }
}

// NOTE In case I need deduplication logic:
// https://upstash.com/blog/nextjs13-approuter-view-counter
