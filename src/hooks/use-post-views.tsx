import useSWR from "swr"

import type { Response } from "@/types"

async function getViews(slug: string) {
  const url = new URL(`/api/views/${slug}`, process.env.NEXT_PUBLIC_APP_URL)
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch views (${slug})`)
  }

  const json: Response<number> = await res.json()
  return json.data
}

async function incrementViews(slug: string) {
  // prettier-ignore
  const url = new URL(`/api/views/${slug}?incr`, process.env.NEXT_PUBLIC_APP_URL)
  const res = await fetch(url)

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