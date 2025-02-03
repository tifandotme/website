import { Instrument_Serif, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

const fontSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--nunito-sans",
})

const fontItalic = Newsreader({
  subsets: ["latin"],
  variable: "--newsreader",
  style: "italic",
})

const fontHeading = Instrument_Serif({
  subsets: ["latin"],
  variable: "--instrument-serif",
  weight: "400",
})

const Commit_Mono = localFont({
  src: "./commitmono-v143.woff2", // relative to where localFont is invoked
  variable: "--commitmono",
})

export const fonts = [fontSans, fontItalic, fontHeading, Commit_Mono]
