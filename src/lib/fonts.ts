import { Inter, JetBrains_Mono, Lora, Newsreader } from "next/font/google"
import localFont from "next/font/local"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-slanted",
})

const gambarino = localFont({
  src: "../lib/Gambarino-Regular.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "400",
})

export const fonts = [inter, jetbrainsMono, lora, newsreader, gambarino]
