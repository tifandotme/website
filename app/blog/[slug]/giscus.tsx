"use client"

import GiscusReact from "@giscus/react"
import React from "react"
import { cn } from "../../_lib/utils"

export function Giscus() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleMessage = (event: MessageEvent) => {
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

  const base =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : "https://tifan.me"

  return (
    <div
      className="no-js not-prose relative -mx-px mt-32 print:hidden"
      aria-hidden="true"
    >
      {isLoading && (
        <div className="h-[220px] w-full animate-pulse rounded-sm bg-foreground/10" />
      )}
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
          inputPosition="bottom"
          lang="en"
          theme={`${base}/giscus.css`}
        />
      </div>
    </div>
  )
}
