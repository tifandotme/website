"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "clsx"
import { allPosts } from "contentlayer/generated"
import { useTheme } from "next-themes"
import { CgDarkMode } from "react-icons/cg"
import { HiDotsHorizontal } from "react-icons/hi"

import { navLinks } from "@/config"

export function NavigationBar() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const pathname = usePathname()
  const isBlogPage = allPosts.map((post) => post.url).includes(pathname)

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div
        className={cn(
          "inline-flex translate-x-[245px] items-center px-3 text-muted-large group-hover:invisible",

          isBlogPage ? "visible" : "invisible",
        )}
      >
        <HiDotsHorizontal size={28} />
      </div>
      {navLinks.map(({ title, url }) => {
        const isActive = pathname === url

        return (
          <Link
            key={url}
            href={url}
            className={cn(
              "inline-flex select-none items-center px-3 text-lg font-semibold text-muted-large transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 group-hover:visible dark:hover:bg-[hsl(0,0%,11%)]",

              isActive && "!text-foreground",
              isBlogPage && "invisible",
            )}
          >
            {title}
          </Link>
        )
      })}
      <button
        className={cn(
          "px-3 text-muted-large transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 group-hover:visible dark:hover:bg-[hsl(0,0%,11%)]",

          isBlogPage && "invisible",
          mounted ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light")
        }}
        title={`Change to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <CgDarkMode
          className={cn(theme === "light" && "rotate-180")}
          size={26}
        />
      </button>
    </>
  )
}
