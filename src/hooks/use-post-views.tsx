import useSWR from "swr"

import type { Response } from "@/types"

async function getViews(slug: string) {
  const res = await fetch(`/api/views/${slug}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch views (${slug})`)
  }

  const json: Response<number> = await res.json()
  return json.data
}

async function incrementViews(slug: string) {
  const res = await fetch(`/api/views/${slug}?incr`)

  if (!res.ok) {
    throw new Error(`Failed to increment views (${slug})`)
  }

  const json: Response<number> = await res.json()
  return json.data
}

export function usePostViews(slug: string) {
  const { data: views, mutate } = useSWR(slug, getViews, {
    revalidateOnFocus: false,
    revalidateOnMount: false,

    // Data will not be undefined initially and isLoading will always be false
    suspense: true,
  })

  const increment = () => {
    mutate(incrementViews(slug), {
      optimisticData: (views ?? 0) + 1,
      revalidate: false,
      populateCache: true,
    })
  }

  return {
    views: views ?? 0,
    increment,
  }
}
