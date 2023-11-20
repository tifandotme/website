import { type NavLinks } from "@/types"

export const site = {
  name: "Tifan Dwi Avianto",
  description:
    "A blog and portfolio site by Tifan. Follow my journey in web development through insightful articles and inspiring projects.",
  author: "Tifan Dwi Avianto",
  baseUrl: "https://tifan.me",
  navLinks: (
    [
      {
        label: "Drafts",
        url: "/drafts",
      },
      {
        label: "Blog",
        url: "/blog",
      },
      {
        label: "Projects",
        url: "/projects",
      },
    ] satisfies NavLinks
  ).filter((link) =>
    process.env.NODE_ENV === "production" ? link.url !== "/drafts" : true,
  ),
} as const
