/* eslint-disable no-unused-vars */

import type { z } from "zod"

import { envSchema } from "@/env"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
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
