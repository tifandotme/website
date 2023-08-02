import { JetBrains_Mono, Newsreader, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// const lora = Lora({
//   subsets: ["latin"],
//   variable: "--font-serif",
// })

const NewsreaderItalic = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-italic",
})

const Gambarino = localFont({
  src: "../lib/assets/gambarino-regular.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "400",
})

export const fonts = [NunitoSans, JetBrainsMono, NewsreaderItalic, Gambarino]
