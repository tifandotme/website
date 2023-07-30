import React from "react"
import { BsRssFill } from "react-icons/bs"

import { site } from "@/config"
import { TopBar } from "@/components/top-bar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />

      {children}

      <footer className="container py-24 text-center font-mono font-semibold uppercase text-muted-darker">
        <a
          href={`${site.baseUrl}/feed.xml`}
          target="_blank"
          className="inline-flex items-center transition-colors hover:text-foreground"
          title="RSS"
        >
          <BsRssFill size={18} className="m-3" />
        </a>
      </footer>
    </>
  )
}
