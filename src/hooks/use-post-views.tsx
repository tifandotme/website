import useSWR from "swr"

import { getViews, incrementViews } from "@/lib/utils"

export function usePostViews(slug: string) {
  const { data, mutate } = useSWR(slug, getViews, {
    revalidateOnFocus: false,
    revalidateOnMount: false,

    // if enabled, data will not be undefined initially and isLoading will always be false
    suspense: true,
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
