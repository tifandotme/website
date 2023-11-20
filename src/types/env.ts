/* eslint-disable no-unused-vars */

import { envVariables } from "@/env"
import { z } from "zod"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
