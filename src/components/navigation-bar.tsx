"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Transition } from "@headlessui/react"
import cn from "clsx"
import { useTheme } from "next-themes"
import { BiDotsHorizontal } from "react-icons/bi"
import { MdDarkMode, MdLightMode } from "react-icons/md"

import { navLinks } from "@/config"

export function NavigationBar() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const pathname = usePathname()
  // const isBlogPage = allPosts.map((post) => post.url).includes(pathname)

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Menu as="div" className="relative inline-flex xs:hidden">
        <Menu.Button className="group px-2 transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)]">
          <BiDotsHorizontal
            size={34}
            className="fill-muted-large group-hover:fill-foreground"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-20 mt-14 flex w-48 origin-top-right flex-col divide-y border bg-background shadow-lg shadow-neutral-300 dark:shadow-neutral-900">
            {navLinks.map(({ title, url }) => (
              <Menu.Item key={url}>
                {({ active }) => (
                  <Link
                    className={cn(
                      "px-4 py-3 text-lg font-semibold text-muted-large transition hover:text-foreground",

                      active &&
                        "bg-[hsl(0,0%,93%)] !text-foreground dark:bg-[hsl(0,0%,11%)]",
                    )}
                    href={url}
                  >
                    {title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      {navLinks.map(({ title, url }) => {
        const isActive = pathname === url

        return (
          <Link
            key={url}
            href={url}
            className={cn(
              "hidden select-none items-center px-3 text-lg font-semibold transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)] xs:inline-flex",

              isActive ? "text-foreground" : "text-muted-large",
            )}
          >
            {title}
          </Link>
        )
      })}

      <div className="hidden flex-1 xs:block" />

      <button
        className={cn(
          "px-3 text-muted-large transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)]",

          mounted ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light")
        }}
        title={`Change to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {/* <CgDarkMode
          className={cn(toggle === false && "rotate-180")}
          size={30}
        /> */}
        {mounted ? (
          theme === "light" ? (
            <MdDarkMode size={28} />
          ) : (
            <MdLightMode size={28} />
          )
        ) : (
          <MdLightMode className="animate-pulse" size={28} />
        )}
      </button>
    </>
  )
}
