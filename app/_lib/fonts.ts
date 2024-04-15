import { Imbue, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

// https://github.com/seek-oss/capsize/pull/192

const fontSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontItalic = Newsreader({
  subsets: ["latin"],
  variable: "--font-italic",
  style: "italic",
})

const fontHeading = Imbue({
  subsets: ["latin"],
  variable: "--font-heading",
})

const Commit_Mono = localFont({
  src: "./commitmono-v143.woff2", // relative to where localFont is invoked
  variable: "--font-mono",
})

export const fonts = [fontSans, fontItalic, fontHeading, Commit_Mono]
