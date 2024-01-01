"use client"

import React from "react"
import { useWindowScroll } from "react-use"

import { cn } from "@/lib/utils"

export function BackToTopButton() {
  const [isScrolled, setIsScrolled] = React.useState(true)
  const { y } = useWindowScroll()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsScrolled(y > window.innerHeight)
    }
  }, [y])

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "instant" })
      }}
      className={cn(
        "pointer-events-none text-left font-medium text-foreground/30 transition-transform hover:text-foreground active:translate-y-0.5",

        isScrolled && "!pointer-events-auto !text-muted",
      )}
    >
      Back to top
    </a>
  )
}
