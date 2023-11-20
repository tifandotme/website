/* eslint-disable no-unused-vars */

import { z } from "zod"

import { envVariables } from "@/env"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
