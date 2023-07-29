import { Inter, JetBrains_Mono, Lora, Newsreader } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-slanted",
})

export const gambarino = localFont({
  src: "../lib/Gambarino-Regular.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "400",
})
