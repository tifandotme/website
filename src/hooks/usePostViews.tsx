import useSWR from "swr"

import { getViews, incrementViews } from "@/lib/utils"

export function usePostViews(slug: string) {
  const { data, mutate } = useSWR(slug, getViews, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    suspense: true, // if true, data can't be undefined and isLoading is a constant false
  })

  const increment = () => {
    mutate(incrementViews(slug), {
      optimisticData: {
        // very rare cases where views is null (new post), fallback to 0
        views: (data.views ?? 0) + 1,
      },
      revalidate: false,
      populateCache: true,
    })
  }

  return {
    views: data.views,
    increment,
  }
}
