import { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

import { site } from "@/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0]

  const navRoutes = site.navLinks.map((nav) => ({
    url: site.baseUrl + nav.url,
    lastModified: today,
  }))

  const contentRoutes = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Intl.Collator().compare(b.date, a.date))
    .map((post) => ({
      url: site.baseUrl + post.url,
      lastModified: today,
    }))

  return [
    {
      url: site.baseUrl,
      lastModified: today,
    },
    ...navRoutes,
    ...contentRoutes,
  ]
}
