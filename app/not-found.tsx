import type { Metadata } from "next"
import Link from "next/link"
import { Icon } from "./_components/icon"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <main className="h-screen flex-col items-center justify-center gap-10 text-center font-sans text-balance">
      <h1 className="text-xl font-semibold text-foreground">
        Sorry, this page isn&apos;t available
      </h1>
      <Link
        className="inline-flex flex-row items-center justify-center gap-3 p-2.5 text-muted hover:text-foreground"
        href="/"
      >
        <Icon id="arrow-left" className="size-4" aria-hidden="true" />
        Back to homepage
      </Link>
    </main>
  )
}
