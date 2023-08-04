/* eslint-disable no-unused-vars */

import { envVariables } from "@/env"
import { z } from "zod"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export type Headings = {
  text: string
  slug: string
}[]

export type NavLinks = {
  readonly label: string
  readonly url: string
}[]

export interface UpstashRedisRestResponse {
  result: boolean | null | "OK"
}

export type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
]
