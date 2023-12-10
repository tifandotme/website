import type { Metadata } from "next"
import Script from "next/script"

import { siteConfig } from "@/config"
import { fonts } from "@/lib/fonts"
import { isProd } from "@/lib/utils"
import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { NProgressProvider } from "@/components/client/nprogress"
import { ThemeProvider } from "@/components/client/theme-provider"

import "@/styles/globals.css"

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
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NProgressProvider>{children}</NProgressProvider>
        </ThemeProvider>

        {!isProd() && <BreakpointIndicator />}

        {isProd() && (
          <Script
            async
            src="https://analytics.tifan.me/script.js"
            data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
          />
        )}

        {/* Detect if client has JS disabled. Most elements such as theme switcher, views counter, and Giscus comment will be hidden when JS is disabled. */}
        <noscript>
          <style>{`.no-js {display: none;}`}</style>
        </noscript>
      </body>
    </html>
  )
}
