import { z } from "zod"

export const envVariables = z
  .object({
    CLOUDINARY_API_SECRET: z.string(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    GITHUB_TOKEN: z.string(),
  })
  .required()

// will check at build time, because this file is imported in next.config.js
const result = envVariables.safeParse(process.env)

if (!result.success) {
  throw new Error("Invalid environment variables: \n" + result.error.message)
}
