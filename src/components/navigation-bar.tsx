"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Transition } from "@headlessui/react"
import cn from "clsx"
import { useTheme } from "next-themes"
import { BiDotsHorizontal } from "react-icons/bi"
import { MdDarkMode, MdLightMode } from "react-icons/md"

import { site } from "@/config"

export function NavigationBar() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const pathname = usePathname()

  return (
    <>
      <Menu as="div" className="relative inline-flex xs:hidden">
        <Menu.Button
          className="group px-2 ring-black transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 active:translate-y-0.5 dark:ring-white dark:hover:bg-[hsl(0,0%,11%)]"
          aria-label="Navigation menu"
          id="headlessui-menu-button" // without id, there will be a hydration missmatch error
        >
          <BiDotsHorizontal
            size={34}
            className="fill-muted-darker group-hover:fill-foreground"
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
          <Menu.Items className="absolute right-0 z-20 mt-14 flex w-48 origin-top-right flex-col divide-y rounded-sm border bg-background shadow-lg shadow-neutral-300 ring-black focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 dark:shadow-neutral-900 dark:ring-white">
            {site.navLinks.map(({ label, url }) => (
              <Menu.Item key={url}>
                {({ active }) => (
                  <Link
                    className={cn(
                      "px-4 py-3 text-lg font-semibold text-muted-darker transition hover:text-foreground",

                      active &&
                        "bg-[hsl(0,0%,93%)] !text-foreground dark:bg-[hsl(0,0%,11%)]",
                    )}
                    href={url}
                  >
                    {label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      {site.navLinks.map(({ label, url }) => {
        const isActive = pathname === url

        return (
          <Link
            key={url}
            href={url}
            className={cn(
              "hidden select-none items-center px-3 text-lg font-semibold transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)] xs:inline-flex",

              isActive ? "text-foreground" : "text-muted-darker",
            )}
          >
            {label}
          </Link>
        )
      })}

      <div className="hidden flex-1 xs:block" />

      <button
        className={cn(
          "px-3 text-muted-darker transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)]",

          mounted ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title={`Change to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {mounted ? (
          theme === "light" ? (
            <MdDarkMode size={28} />
          ) : (
            <MdLightMode size={28} />
          )
        ) : (
          <MdLightMode size={28} />
        )}
      </button>
    </>
  )
}
