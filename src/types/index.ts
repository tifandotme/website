export type Response<TData = unknown> = {
  message: string
  data?: TData
}

export type NavItem = {
  title: string
  href: string
}

export type SiteConfig = {
  name: string
  description: string
  author: string
  navItems: NavItem[]
}

export type HeadingItem = {
  text: string
  slug: string
}

export type HeadingsField = HeadingItem[]
