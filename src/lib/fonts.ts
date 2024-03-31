import {
  Imbue,
  JetBrains_Mono,
  Newsreader,
  Nunito_Sans,
} from "next/font/google"

const fontSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
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
})

export const fonts = [fontSans, fontMono, fontItalic, fontHeading]
