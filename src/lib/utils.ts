export function cn(...args: unknown[]): string | undefined {
  return (
    args
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || undefined
  )
}

export function isProd() {
  return process.env.NODE_ENV === "production"
}

export function absoluteUrl(path: string) {
  const origin = process.env.NEXT_PUBLIC_APP_URL
  const url = new URL(path, origin)

  return url.toString()
}
