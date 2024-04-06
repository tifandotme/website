"use client"

import { Icon } from "./_components/icon"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 font-sans">
      <h1 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <button
        className="inline-flex flex-row items-center justify-center gap-3 p-2.5 text-muted hover:text-foreground"
        type="button"
        onClick={reset}
      >
        <Icon id="loop" className="size-4" />
        Try again
      </button>
    </main>
  )
}
