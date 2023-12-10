import { z } from "zod"

export const envSchema = z
  .object({
    NEXT_PUBLIC_APP_URL: z.string().url(),
    CLOUDINARY_API_SECRET: z.string(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    GITHUB_ACCESS_TOKEN: z.string(),
  })
  .required()

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(result.error.message)

  process.exit(1)
}
