import { type Metadata } from "next"
import Script from "next/script"
import cn from "clsx"

import { fontMono, fontSans, fontSerif } from "@/lib/fonts"
import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s — Tifan Dwi Avianto",
    default: "Tifan Dwi Avianto",
  },
  description:
    "A blog and portfolio site by Tifan. Follow my journey in web development through insightful articles and inspiring projects.",
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
  creator: "Tifan Dwi Avianto",
  authors: [
    {
      name: "Tifan Dwi Avianto",
      url: "https://twitter.com/tifandotme",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "light" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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

// TODO: add icon, apple-icon
// TODO: add blog to blogs.hn and ooh.directory
