import Link from "next/link"
import React from "react"
import { Icon } from "../_components/icon"

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
] as const

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header
        className="container-md flex items-center gap-6 py-14 sm:pb-20 sm:pt-24 md:pt-32"
        aria-label="Navigation"
      >
        <Link
          className="-m-2.5 flex h-11 min-h-10 p-2.5 text-muted-darker/90 hover:text-foreground"
          href="/"
          title="Homepage"
          draggable="false"
        >
          <Icon id="home" className="size-5 self-center" />
        </Link>
        <hr className="h-[19px] w-px bg-muted/30" aria-hidden="true" />
        <ul className="inline-flex gap-6">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                className="-mx-2 flex h-11 select-none items-center px-2 text-[103%] font-bold text-muted-darker/90 hover:text-foreground"
                href={item.href}
                draggable="false"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <main className="pb-14 sm:pb-24 md:pb-32">{children}</main>
    </>
  )
}
