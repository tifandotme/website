import type { SiteConfig } from "@/types"
import { isProd } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "Tifan Dwi Avianto",
  description:
    "A blog and portfolio site by Tifan. Follow my journey in web development through insightful articles and inspiring projects.",
  author: "Tifan Dwi Avianto",
  navItems: [
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Projects",
      href: "/projects",
    },
  ],
}

if (!isProd()) {
  siteConfig.navItems.unshift({
    title: "Drafts",
    href: "/drafts",
  })
}
