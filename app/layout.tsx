import type { Metadata } from "next"
import { fonts } from "./_lib/fonts"
import "./globals.css"
import { PreloadResources } from "./preload"

export const metadata: Metadata = {
  title: {
    template: "%s — Tifan Dwi Avianto",
    default: "Tifan Dwi Avianto — Software Engineer",
  },
  description:
    "Code smarter, not harder. A dev blog by Tifan to level up your web development skills.",
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
  authors: [{ name: "Tifan Dwi Avianto" }],
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL(`http://localhost:${process.env.PORT || 3000}`),
  openGraph: {
    type: "website",
    images: "/og",
  },
  other: {
    "darkreader-lock": "_", // REF https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site
  },
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={fonts.map((font) => font.variable).join(" ")}>
        {children}
        {process.env.NODE_ENV === "production" && (
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