import { Inter, JetBrains_Mono, Lora, Newsreader } from "next/font/google"

// https://fonts.google.com/variablefonts
// https://fontsource.org/

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const fontSerifSlanted = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif-slanted",
})
