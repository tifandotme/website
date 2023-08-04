import { z } from "zod"

export const envVariables = z
  .object({
    CLOUDINARY_API_SECRET: z.string(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
  })
  .required()

const result = envVariables.safeParse(process.env)

if (!result.success) {
  throw new Error("Invalid environment variables: \n" + result.error.message)
}
