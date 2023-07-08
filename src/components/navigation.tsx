"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/config"

import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map(({ title, url }) => {
        const isActive = pathname === url

        return (
          <Link
            key={url}
            href={url}
            className={cn(
              "px-2 py-1 transition hover:text-gray-700 active:translate-y-0.5",
              isActive && "text-gray-700"
            )}
          >
            {title}
          </Link>
        )
      })}
    </>
  )
}
