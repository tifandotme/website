import { cache } from "react"
import type { Post } from "contentlayer/generated"

import { octokit } from "@/lib/github/init"

export const getLastModified = cache(async (post: Post) => {
  try {
    const res = await octokit.repos.listCommits({
      owner: "tifandotme",
      repo: "website",
      path: `content/${post._raw.sourceFilePath}`,
      per_page: 1,
    })

    return res.data[0]?.commit?.committer?.date ?? new Date(0).toISOString()
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
    }

    return new Date(0).toISOString()
  }
})
