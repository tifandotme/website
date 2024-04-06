import type { MetadataRoute } from "next"
import { getAllPosts } from "./_lib/blog"

export const navItems = [{ href: "/projects", label: "Projects" }] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0]

  const navRoutes = navItems.map(({ href }) => ({
    url: `https://tifan.me${href}`,
    lastModified: today,
  }))

  const contentRoutes = await getAllPosts().then((posts) =>
    posts.map((post) => ({
      url: post.url,
      lastModified: today,
    })),
  )

  return [
    {
      url: "https://tifan.me",
      lastModified: today,
    },
    ...navRoutes,
    ...contentRoutes,
  ]
}
