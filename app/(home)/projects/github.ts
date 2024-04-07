"use server"

export async function fetchStargazersCount(repoUrl: string) {
  try {
    const res = await fetch(
      `https://api.github.com/repos${new URL(repoUrl).pathname}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
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
