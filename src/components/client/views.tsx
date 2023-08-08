"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { usePostViews } from "@/hooks/usePostViews"

export default function Views({ slug }: { slug: string }) {
  const { views, increment } = usePostViews(slug)

  const isPostPage = usePathname().startsWith("/blog/")

  // very rare cases where views is null (new post), set fallback
  const fallback = isPostPage ? views ?? 1 : views ?? 0

  const formattedViews = fallback.toLocaleString("id-ID")

  return (
    <>
      <span className="-mx-0.5 animate-[mutation_1.5s_ease-in-out_1] px-0.5 tabular-nums">
        {formattedViews}
      </span>

      {isPostPage && <IncrementOnMount increment={increment} />}
    </>
  )
}

function IncrementOnMount({ increment }: { increment: () => void }) {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return

    increment()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
