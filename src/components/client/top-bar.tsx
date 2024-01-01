"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export function TopBar() {
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const { theme, setTheme } = useTheme()

  // REF https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const pathname = usePathname()

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="pb-5 pt-10 lg:pb-7 lg:pt-14" // half
    >
      <nav
        className={cn(
          "container flow-root px-6 sm:px-10 lg:px-16",
          "pb-5 lg:pb-7", // half
        )}
      >
        <Link
          href="/"
          className={cn(
            "absolute inline-flex h-12 select-none items-center text-muted-darker transition hover:text-foreground active:translate-y-0.5",

            pathname === "/projects" ? "xl:fixed" : "lg:fixed",
          )}
          onClick={() => isOpen && setIsOpen(false)}
          title="Go to homepage"
        >
          <Icon id="logo" className="h-[2.2em] w-[2.2em]" />
        </Link>

        <div className="relative float-right inline-flex h-12 gap-3">
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "block items-center px-3 text-muted-darker transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 xs:hidden dark:hover:bg-[hsl(0,0%,11%)]",

                mounted ? "pointer-events-auto" : "pointer-events-none",
              )}
              aria-controls="radix-collapsible"
              aria-label="Navigation menu"
            >
              {isOpen ? (
                <Icon id="collapse" className="h-7 w-7" />
              ) : (
                <Icon id="expand" className="h-7 w-7" />
              )}
            </button>
          </CollapsibleTrigger>

          {siteConfig.navItems.map(({ title, href }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "hidden select-none items-center px-3 text-lg font-bold transition hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 xs:inline-flex dark:hover:bg-[hsl(0,0%,11%)]",

                  isActive ? "text-foreground" : "text-muted-darker",
                )}
              >
                {title}
              </Link>
            )
          })}

          <div className="no-js hidden flex-1 xs:block" />

          <button
            className={cn(
              "px-3 text-muted-darker transition-transform hover:bg-[hsl(0,0%,93%)] hover:text-foreground active:translate-y-0.5 dark:hover:bg-[hsl(0,0%,11%)]",

              "no-js",

              mounted ? "pointer-events-auto" : "pointer-events-none",
            )}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title={`Switch to ${
              mounted && theme === "light" ? "dark" : "light"
            } theme`}
          >
            {mounted && theme === "light" ? (
              <Icon id="moon" className="h-7 w-7" />
            ) : (
              <Icon id="sun" className="h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      <CollapsibleContent
        className={cn(
          "select-none border-y bg-[hsl(0,0%,94%)] text-muted shadow-[inset_0_2px_39px_-12px_rgba(0,0,0,0.15)] xs:hidden dark:bg-[hsl(0,0%,10%)]",

          // open/close animation
          "overflow-hidden data-[state='closed']:animate-[slideUp_200ms_ease-out] data-[state='open']:animate-[slideDown_200ms_ease-out]",
        )}
        id="radix-collapsible"
      >
        {siteConfig.navItems.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className="block px-4 py-3 text-center text-lg font-bold tracking-wider transition-transform first:mt-2 last:mb-2 hover:text-foreground active:translate-y-0.5 active:text-foreground"
            onClick={() => isOpen && setIsOpen(false)}
          >
            {title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
