"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "clsx"

import { navLinks } from "@/config"
import { Logo } from "@/components/logo"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLElement>(null)
  const pathname = usePathname()

  return (
    <>
      <nav
        ref={ref}
        className="container flow-root px-6 py-16 sm:px-10 lg:px-16"
      >
        <Link
          href="/"
          onClick={() => {
            // TODO: is there a better way to scroll to top?
            ref.current?.scrollIntoView({ behavior: "instant" })
          }}
          className="absolute select-none transition active:translate-y-0.5 lg:fixed"
        >
          <Logo intersectionRef={ref} />
        </Link>
        <div className="float-right inline-flex gap-3">
          {navLinks.map(({ title, url }) => {
            const isActive = pathname === url

            return (
              <Link
                key={url}
                href={url}
                className={cn(
                  "px-3 py-2 text-lg font-medium text-gray-400 underline transition hover:text-gray-700 active:translate-y-0.5",
                  isActive && "text-gray-700",
                )}
              >
                {title}
              </Link>
            )
          })}
        </div>
      </nav>

      {children}
    </>
  )
}
