import { Imbue, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

const fontSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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

  // temp fix
  display: "swap",
  adjustFontFallback: false,
})

const Commit_Mono = localFont({
  src: "./commitmono-v143.woff2", // relative to where localFont is invoked
  variable: "--font-mono",
})

export const fonts = [fontSans, fontItalic, fontHeading, Commit_Mono]
