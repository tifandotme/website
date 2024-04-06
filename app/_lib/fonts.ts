import { Imbue, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

const fontSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = localFont({
  src: "./commitmono-v143.woff2", // relative to where localFont is invoked
  variable: "--font-mono",
})

const fontItalic = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-italic",

  // REF temp fix from https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
  display: "swap",
  adjustFontFallback: false,
})

const fontHeading = Imbue({
  subsets: ["latin"],
  variable: "--font-heading",

  // REF temp fix from https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
  display: "swap",
  adjustFontFallback: false,
})

export const fonts = [fontSans, fontMono, fontItalic, fontHeading]
