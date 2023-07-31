import { type Metadata } from "next"
import Script from "next/script"

import { site } from "@/config"
import { fonts } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { NavigationProgressProvider } from "@/components/navigation-progress"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s — " + site.name,
    default: site.name + " — Software Engineer",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-blue-500 selection:text-neutral-50 dark:selection:bg-blue-700",

          fonts.map((font) => font.variable),
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          <NavigationProgressProvider>{children}</NavigationProgressProvider>
        </ThemeProvider>

        <BreakpointIndicator />

        {process.env.VERCEL_URL === "tifan.me" && (
          <Script
            async
            src="https://analytics.tifan.me/script.js"
            data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
          />
        )}
      </body>
    </html>
  )
}

// TODO: add icon, apple-icon, refine favicon
// TODO: add blog to blogs.hn and ooh.directory
// TODO: generate opengraphs
