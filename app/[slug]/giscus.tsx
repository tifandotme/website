"use client"

import GiscusReact from "@giscus/react"
import React from "react"
import { cn } from "../_lib/utils"

export function Giscus() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    if (!window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(mediaQuery.matches ? "dark" : "light")

    function onChange(event: MediaQueryListEvent): void {
      setTheme(event.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener("change", onChange)

    return () => {
      mediaQuery.removeEventListener("change", onChange)
    }
  }, [])

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return

      const height = event.data.giscus.resizeHeight

      // only show the comments after the loading animation is done
      if (Math.round(height) > 90) {
        setIsLoading(false)
      }
    }
    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <div
      className={cn("no-js not-prose relative mt-20", !isLoading && "-mb-2")}
      aria-hidden="true"
    >
      {isLoading && <GiscusSkeleton />}
      <div className={cn(isLoading && "absolute top-0 w-full opacity-0")}>
        <GiscusReact
          id="giscus"
          repo="tifandotme/website"
          repoId="R_kgDOJq-RTg"
          category="Replies"
          categoryId="DIC_kwDOJq-RTs4CYYEc"
          mapping="og:title"
          strict="1"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === "dark" ? "transparent_dark" : "light"}
          lang="en"
        />
      </div>
    </div>
  )
}

export function GiscusSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="mb-[23px] h-[28px] w-[35%] animate-pulse rounded-sm bg-foreground/5" />
      <div className="h-[234px] w-full animate-pulse rounded-sm bg-foreground/5" />
    </div>
  )
}
