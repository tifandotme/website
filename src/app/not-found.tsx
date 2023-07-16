import cn from "clsx"
import { FaArrowLeft } from "react-icons/fa6"

import { fontSans } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"

export default function NotFound() {
  return (
    // when 404 is called by global unmatched URL, not by notFound function, this 404 page doesn't inherit root layout, so we need to redefine theme provider and font variable

    // TODO: replace <title> tag work around once https://github.com/vercel/next.js/pull/52678 is released
    <ThemeProvider attribute="class" enableSystem>
      <title>Page Not Found</title>
      <main
        className={cn(
          fontSans.variable,
          "flex h-screen flex-col items-center justify-center gap-10 font-sans",
        )}
      >
        <h1 className="text-xl font-semibold text-foreground">
          404 - Page Not Found
        </h1>
        <a
          className="group mb-10 inline-flex flex-row items-center justify-center gap-3 rounded-lg border px-4 py-3 font-medium transition active:scale-95"
          href="/"
        >
          <FaArrowLeft
            size={15}
            className="transition group-hover:-translate-x-0.5"
          />
          Go back home
        </a>
      </main>
    </ThemeProvider>
  )
}
