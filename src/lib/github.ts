import type { Post, Project } from "contentlayer/generated"

// NOTE rate limit for authenticated user is 5000 req/hour
// https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
}

export async function getLastModified(post: Post) {
  try {
    const path = encodeURIComponent(`content/${post._raw.sourceFilePath}`)
    const url = `https://api.github.com/repos/tifandotme/website/commits?per_page=1&path=${path}`

    const res = await fetch(url, {
      headers,
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch last modified date (${post.slug})`)
    }

    const json = await res.json()

    return (json[0]?.commit?.committer?.date as string) ?? null
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }

    return null
  }
}

export async function getStars(project: Project) {
  try {
    const path = new URL(project.repo).pathname
    const url = `https://api.github.com/repos${path}`

    const res = await fetch(url, {
      headers,
      next: {
        revalidate: 3600, // 1 hour
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch stargazers count (${project.slug})`)
    }

    const json = await res.json()

    return json.stargazers_count as number
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }

    return null
  }
}
