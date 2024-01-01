import type { Metadata } from "next"

import { Icon } from "@/components/icon"

// WARN when server logs is showing this error: https://nextjs.org/docs/messages/deopted-into-client-rendering, any calls to notFound() will return 500 error instead

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 font-sans">
      <h1 className="text-xl font-semibold text-foreground">
        Sorry, this page isn&apos;t available
      </h1>

      <a
        className="mb-10 inline-flex flex-row items-center justify-center gap-3 rounded-lg border px-4 py-3 font-medium transition active:scale-95"
        href="/"
      >
        <Icon id="arrow-left" className="h-3.5 w-3.5" />
        Back to homepage
      </a>
    </main>
  )
}
