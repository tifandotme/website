"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { isProd } from "@/lib/utils"
import { usePostViews } from "@/hooks/use-post-views"

interface ViewsProps {
  slug: string
}

export default function Views({ slug }: ViewsProps) {
  const { views, increment } = usePostViews(slug)

  const isPostPage = usePathname().startsWith("/blog/")

  return (
    <>
      <span className="-mx-0.5 animate-[mutation_1.5s_ease-in-out_1] px-0.5 tabular-nums">
        {views.toLocaleString("id-ID")}
      </span>

      {isPostPage && <IncrementOnMount increment={increment} />}
    </>
  )
}

interface IncrementOnMountProps {
  increment: () => void
}

function IncrementOnMount({ increment }: IncrementOnMountProps) {
  React.useEffect(() => {
    if (isProd()) {
      increment()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
