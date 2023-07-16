"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "clsx"
import { allPosts } from "contentlayer/generated"
import { useTheme } from "next-themes"
import { CgDarkMode } from "react-icons/cg"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

import { navLinks } from "@/config"
import { LogoSvg } from "@/components/logo"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const pathname = usePathname()

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return

  const isBlogPage = allPosts.map((post) => post.url).includes(pathname)

  return (
    <>
      <nav className="container flow-root px-6 py-14 sm:px-10 lg:px-16">
        <Link
          href="/"
          title="Go to homepage"
          className="absolute z-10 select-none transition-transform active:translate-y-0.5 lg:fixed"
        >
          <LogoSvg className="fill-muted-large text-[2.6rem] transition-colors hover:fill-foreground" />
        </Link>

        <div className="group relative float-right inline-flex gap-3">
          <div
            className={cn(
              "translate-x-60 p-2 text-muted-large group-hover:invisible",

              isBlogPage ? "visible" : "invisible",
            )}
          >
            <HiOutlineDotsHorizontal size={28} />
          </div>

          {navLinks.map(({ title, url }) => {
            const isActive = pathname === url

            return (
              <Link
                key={url}
                href={url}
                className={cn(
                  "select-none px-3 py-2 text-lg font-semibold text-muted-large transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 group-hover:visible dark:hover:bg-[hsl(0,0%,11%)]",

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
            )}
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light")
            }}
            title={`Change to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <CgDarkMode
              className={cn(theme === "light" && "rotate-180")}
              size={25}
            />
          </button>
        </div>
      </nav>

      {children}

      <footer className="container py-24 text-center font-mono font-semibold text-muted-large">
        {/* TODO: swap this once the blog has enough content */}
        {/* CC BY-NC-SA 4.0 2023-PRESENT
        <span className="relative top-[4px] text-[24px]"> © </span>Tifan Dwi
        Avianto */}
        {":)"}
      </footer>
    </>
  )
}
