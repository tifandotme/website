"use client"

import React from "react"
import mermaid from "mermaid"
import { useTheme } from "next-themes"
import defaultTheme from "tailwindcss/defaultTheme"

import { cn } from "@/lib/utils"

import { Spinner } from "../icons"

export function Mermaid({ content }: { content: string }) {
  const [processedSvg, setProcessedSvg] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [bleed, setBleed] = React.useState(false)

  const isDarkTheme = useTheme().theme === "dark"
  const id = React.useId()

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    render()

    async function render() {
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: [
            "var(--font-sans)",
            ...defaultTheme.fontFamily.sans,
          ].join(","),
          themeCSS:
            "margin: 1.5rem auto 0; line-height: 1.5; .pieOuterCircle { opacity: 0.5 }",
          fontSize: 16,
          gitGraph: {
            useMaxWidth: true,
          },
          pie: {
            useWidth: 900,
          },
          theme: isDarkTheme ? "dark" : "default",
          //http://mermaid.js.org/config/theming.html
        })

        const { svg } = await mermaid.render(
          // strip invalid characters for `id` attribute
          id.replaceAll(":", ""),
          content,
        )

        const wrapperWidth = wrapperRef.current?.offsetWidth
        if (wrapperWidth) {
          setBleed(getWidth(svg) > wrapperWidth)
        }

        setProcessedSvg(svg)
      } catch (error) {
        setIsError(true)

        if (error instanceof Error) {
          console.error("Error while rendering mermaid: ", error.message)
        }

        throw error
      } finally {
        setIsLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme])

  return isLoading ? (
    <div
      ref={wrapperRef}
      className="my-12 flex w-full justify-center text-muted"
    >
      <Spinner />
    </div>
  ) : isError ? (
    <div className="my-12 justify-self-center text-muted">
      Error while rendering mermaid
    </div>
  ) : (
    <div
      className={cn(bleed && "!col-span-full")}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    ></div>
  )
}

/**
 * Get width of of the svg returned by mermaid, so that we can compare it to the
 * width of the wrapper element and determine if the diagram is bleeding (width
 * exceeds grid's main column width)
 *
 * We later get the wrapper element width by measuring loading element width (see `useRef` above)
 */
function getWidth(svg: string): number {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svg, "image/svg+xml")
  const svgElement = doc.documentElement

  const styleAttribute = svgElement.getAttribute("style")

  // pie charts shouldn't bleed (their width is relatively narrow)
  const ariaRole = svgElement.getAttribute("aria-roledescription")
  if (ariaRole === "pie") {
    return 0
  }

  if (styleAttribute) {
    const styles = styleAttribute.split(";")

    const maxWidthStyle = styles.find((style) =>
      style.trim().startsWith("max-width:"),
    )

    if (maxWidthStyle) {
      const maxWidth = maxWidthStyle.split(":").pop()?.replace("px", "").trim()

      return maxWidth ? Number(maxWidth) : 0
    }
  }

  return 0
}
