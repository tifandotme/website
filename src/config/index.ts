import { type NavLink } from "@/types"

export const baseUrlDynamic = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`

export const baseUrl = "https://tifan.me"

export const navLinks: NavLink[] = [
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Projects",
    url: "/projects",
  },
]
