import type { Metadata } from "next"
import { fonts } from "./_lib/fonts"
import "./globals.css"
import { PreloadResources } from "./preload"
import { SandPackCSS } from "./sandpack-css"

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

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <SandPackCSS />
      </head>
      <body className={fonts.map((font) => font.variable).join(" ")}>
        {children}
        {process.env.VERCEL_ENV === "production" && (
          <script
            defer
            src="/stats/script.js"
            data-website-id="8f49618f-b08d-4168-9bd2-003e22eb4cb4"
            data-cache="true"
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
