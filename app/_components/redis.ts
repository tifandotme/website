"use server"

const url = process.env.KV_REST_API_URL as string
const token = process.env.KV_REST_API_TOKEN as string

export async function fetchViews(slug: string, increment = false) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        increment ? ["HINCRBY", "views", slug, 1] : ["HGET", "views", slug],
      ),
      next: {
        revalidate: 0,
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch Upstash API")
    }

    const result = (await res.json()).result as string | null
    return Number(result)
  } catch (err) {
    console.error(err instanceof Error ? err.message : "An error occured")
    return null
  }
}
