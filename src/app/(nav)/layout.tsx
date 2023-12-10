import React from "react"

import { absoluteUrl } from "@/lib/utils"
import { TopBar } from "@/components/client/top-bar"
import { Icons } from "@/components/icons"

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <TopBar />

      {children}

      <footer className="container py-24 text-center font-mono font-semibold uppercase text-muted-darker">
        <a
          href={absoluteUrl("/feed.xml")}
          target="_blank"
          className="inline-flex items-center transition-colors hover:text-foreground"
          title="RSS"
        >
          <Icons.Feed className="m-3 h-4 w-4" />
        </a>
      </footer>
    </>
  )
}
