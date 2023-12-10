import type { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

import { siteConfig } from "@/config"
import { absoluteUrl } from "@/lib/utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0]

  const navRoutes = siteConfig.navItems.map((nav) => ({
    url: absoluteUrl(nav.href),
    lastModified: today,
  }))

  const contentRoutes = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Intl.Collator().compare(b.date, a.date))
    .map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: today,
    }))

  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL as string,
      lastModified: today,
    },
    ...navRoutes,
    ...contentRoutes,
  ]
}
