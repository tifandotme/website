import type { Metadata, Viewport } from "next"
import { fonts } from "./_lib/fonts"
import "./globals.css"
import { PreloadResources } from "./preload"

export const metadata: Metadata = {
  metadataBase:
    process.env.VERCEL_ENV === "production"
      ? new URL(`https://tifan.me`)
      : process.env.VERCEL_URL
        ? new URL(`https://${process.env.VERCEL_URL}`)
        : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: {
    template: "%s — Tifan Dwi Avianto",
    default: "Tifan Dwi Avianto — Software Engineer",
  },
  description: "Developer blog to level up your software engineering skills.",
  openGraph: {
    title: "Tifan Dwi Avianto",
    description: "Developer blog to level up your software engineering skills.",
    type: "website",
    images: "/og",
    locale: "en_US",
    url: "https://tifan.me",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tifandotme",
    images: "/og",
  },
  keywords: [
    "tifan dwi avianto",
    "tifan",
    "tifandotme",
    "portfolio",
    "blog",
    "personal site",
  ],
  creator: "Tifan Dwi Avianto",
  other: { "darkreader-lock": "_" },
}

export const viewport: Viewport = {
  themeColor: [
    {
      color: "hsl(240 4% 8%)",
      media: "(prefers-color-scheme: dark)",
    },
    {
      color: "hsl(0 0% 100%)",
      media: "(prefers-color-scheme: light)",
    },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={fonts.map((font) => font.variable).join(" ")}>
        {children}
        {process.env.VERCEL_ENV === "production" && (
          <script
            defer
            src="https://analytics.tifan.me/script.js"
            data-website-id="4640120e-93d1-40c9-b2de-603330c2ad6d"
          />
        )}
        <PreloadResources />
        <noscript>
          <style>{`.no-js {display: none;}`}</style>
        </noscript>
      </body>
    </html>
  )
}
