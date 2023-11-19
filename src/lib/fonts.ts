import { JetBrains_Mono, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

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
})

const fontHeading = localFont({
  src: "../assets/fonts/gambarino-regular.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "400",
})

export const fonts = [fontSans, fontMono, fontItalic, fontHeading]
