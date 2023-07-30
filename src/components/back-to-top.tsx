"use client"

import React from "react"
import cn from "clsx"
import { BiUpArrowAlt } from "react-icons/bi"
import { useWindowScroll } from "react-use"

export function BackToTopButton({ path }: { path: string }) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { y } = useWindowScroll()

  React.useEffect(() => {
    // avoid SSR mismatch
    if (typeof window !== "undefined") {
      setIsScrolled(y > window.innerHeight)
    }
  }, [y])

  return (
    <a
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
    >
      Back to top <BiUpArrowAlt className="ml-[1px] inline-block" size={21} />
    </a>
  )
}
