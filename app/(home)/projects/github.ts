"use server"

// NOTE rate limit for authenticated user is 5000 req/hour
// https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users

const TOKEN = process.env.GITHUB_ACCESS_TOKEN

if (!TOKEN) {
  throw new Error("GITHUB_ACCESS_TOKEN is not set")
}

export async function fetchStargazersCount(repoUrl: string) {
  try {
    const res = await fetch(
      `https://api.github.com/repos${new URL(repoUrl).pathname}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${TOKEN}`,
        },
        next: {
          revalidate: 60 * 60 * 24, // 1 day
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch stargazers count for ${repoUrl}`)
    }

    const result = (await res.json()).stargazers_count as number
    return result
  } catch (err) {
    console.error(err instanceof Error ? err.message : "An error occured")
    return 0
  }
}
