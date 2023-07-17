"use client"

import Link from "next/link"
import cn from "clsx"
import { BiUpArrowAlt } from "react-icons/bi"
import { useWindowScroll } from "react-use"

export function BackToTopButton({ path }: { path: string }) {
  const { y } = useWindowScroll()

  // avoid hydration mismatch, server doesn't have window object
  let isScrolled
  if (typeof window === "undefined") {
    isScrolled = false
  } else {
    isScrolled = y > window.innerHeight
  }

  return (
    <Link
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "instant" })
      }}
      className={cn(
        "text-sm font-medium transition-transform hover:text-foreground active:translate-y-0.5",

        isScrolled
          ? "pointer-events-auto text-muted"
          : "pointer-events-none text-[hsl(0,0%,75%)] dark:text-[hsl(0,0%,20%)]",
      )}
      href={path}
      prefetch={false}
    >
      Back to top <BiUpArrowAlt className="ml-[1px] inline-block" size={21} />
    </Link>
  )
}
