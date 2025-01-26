import type { Metadata } from "next"
import { fonts } from "./_lib/fonts"
import { FloatingUmamiIndicator } from "./floating-umami-indicator"
import "./globals.css"
import { PreloadResources } from "./preload"
import { SandPackCSS } from "./sandpack-css"

export const metadata: Metadata = {
  metadataBase: new URL(`https://tifan.me`),
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
    <html lang="en" className={fonts.map((font) => font.variable).join(" ")}>
      <head>
        <SandPackCSS />
      </head>
      <body>
        {children}
        <PreloadResources />
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              defer
              src="/umami/script.js"
              data-website-id="8f49618f-b08d-4168-9bd2-003e22eb4cb4"
              data-domains="tifan.me"
              data-cache="true"
            />
            <FloatingUmamiIndicator />
          </>
        )}
        <noscript>
          <style>{`.no-js {display: none;}`}</style>
        </noscript>
      </body>
    </html>
  )
}
