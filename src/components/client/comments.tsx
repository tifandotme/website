"use client"

import React from "react"
import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

// also see "giscus:backlink" in src/app/(nav)/blog/[slug]/page.tsx
export default function Comments() {
  const [show, setShow] = React.useState(false)

  const isDarkTheme = useTheme().theme === "dark"

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return

      const height = event.data.giscus.resizeHeight

      // only show the comments after the loading animation is done
      if (Math.round(height) > 90) {
        setShow(true)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <div className="relative">
      <LoadingComments className={cn(show ? "hidden" : "block")} />
      <div
        className={cn(!show && "absolute top-0 mt-24 flex w-full opacity-0")}
      >
        <Giscus
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
          theme={isDarkTheme ? "transparent_dark" : "light"}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export function LoadingComments({ className }: { className?: string }) {
  return (
    <div className={cn("flex animate-pulse flex-col", className)}>
      <div className="mb-[23px] h-[28px] w-[35%] rounded-sm bg-[hsl(var(--foreground)/21%)] dark:bg-[hsl(var(--foreground)/15%)]" />
      <div className="h-[234px] w-full rounded-sm bg-[hsl(var(--foreground)/21%)] dark:bg-[hsl(var(--foreground)/15%)]" />
    </div>
  )
}
