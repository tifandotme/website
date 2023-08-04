/* eslint-disable no-unused-vars */

import { envVariables } from "@/env"
import { z } from "zod"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {
      VERCEL_ENV: "development" | "preview" | "production"
    }
  }
}

export interface UpstashRedisRestResponse<T extends boolean | number> {
  result: T extends boolean ? "OK" | null : T | null
}

export interface GitHubRestResponse {
  stargazers_count: number
}

export type NavLinks = Array<{
  readonly label: string
  readonly url: string
}>

export type HeadingsField = Array<{
  text: string
  slug: string
}>

export type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
]
