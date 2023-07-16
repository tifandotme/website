"use client"

import Link from "next/link"

export function ScrollToTopButton({ path }: { path: string }) {
  return (
    // TODO: hide when at top
    <Link
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "instant" })
      }}
      className="text-sm font-medium text-muted transition hover:text-foreground active:translate-y-0.5"
      href={path}
      prefetch={false}
    >
      Scroll to top <span aria-hidden="true">↑</span>
    </Link>
  )
}
