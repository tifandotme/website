import { type Metadata } from "next"
import Script from "next/script"
import cn from "clsx"

import { site } from "@/config"
import { generateRSS } from "@/lib/feed"
import { fontMono, fontSans, fontSerif, fontSerifSlanted } from "@/lib/fonts"
import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s — " + site.name,
    default: site.name,
  },
  description: site.description,
  keywords: [
    "tifan dwi avianto",
    "tifan",
    "tifandotme",
    "portfolio",
    "blog",
    "personal site",
    "web development",
    "javascript",
    "typescript",
    "react",
  ],
  creator: site.author,
  authors: [
    {
      name: site.author,
      url: "https://twitter.com/tifandotme",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "light" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  other: {
    "darkreader-lock": "_", // disable Dark Reader
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === "production") {
    await generateRSS()
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-blue-500 selection:text-neutral-50 dark:selection:bg-blue-700",

          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
          fontSerifSlanted.variable,
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          {children}
          <BreakpointIndicator />
        </ThemeProvider>
        <Script
          async
          src="https://analytics.tifan.me/script.js"
          data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
        />
      </body>
    </html>
  )
}

// TODO: add icon, apple-icon, refine favicon
// TODO: add blog to blogs.hn and ooh.directory
