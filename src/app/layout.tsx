import type { Metadata } from "next"
import Script from "next/script"
import { ThemeProvider } from "next-themes"

import { siteConfig } from "@/config"
import { fonts } from "@/lib/fonts"
import { isProd } from "@/lib/utils"
import { NProgressProvider } from "@/app/nprogress"

import "@/styles/globals.css"

import { BreakpointIndicator } from "@/app/breakpoint-indicator"

export const metadata: Metadata = {
  title: {
    template: "%s — " + siteConfig.name,
    default: siteConfig.name + " — Software Engineer",
  },
  description: siteConfig.description,
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
  creator: siteConfig.author,
  authors: [
    {
      name: siteConfig.author,
    },
  ],
  other: {
    "darkreader-lock": "_", // REF https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site
  },
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.map((font) => font.variable).join(" ")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <NProgressProvider>
            {children}

            {isProd() ? (
              <Script
                defer
                src="https://analytics.tifan.me/script.js"
                data-website-id="e0c792f9-efbb-49ee-b4d1-c58892d76c2a"
              />
            ) : (
              <BreakpointIndicator />
            )}
          </NProgressProvider>
        </ThemeProvider>

        {/* Detect if client has JS disabled. Most elements such as theme switcher, views counter, and Giscus comment will be hidden when JS is disabled. */}
        <noscript>
          <style>{`.no-js {display: none;}`}</style>
        </noscript>
      </body>
    </html>
  )
}
