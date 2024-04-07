import type { Metadata } from "next"
import { Icon } from "./_components/icon"

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
        className="inline-flex flex-row items-center justify-center gap-3 p-2.5 text-muted hover:text-foreground"
        href="/"
      >
        <Icon id="arrow-left" className="size-4" />
        Back to homepage
      </a>
    </main>
  )
}
