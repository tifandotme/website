import { cache } from "react"
import type { Project } from "contentlayer/generated"

import { octokit } from "@/lib/github/init"

// TODO check if this works
export const revalidate = 3600

export const getStars = cache(async (project: Project) => {
  const repo = project.repo.split("/").pop() as string

  try {
    const res = await octokit.repos.get({
      owner: "tifandotme",
      repo,
    })

    return res.data.stargazers_count
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        err.message === "Not Found" ? `Repo "${repo}" not found` : err.message,
      )
    }

    return 0
  }
})
