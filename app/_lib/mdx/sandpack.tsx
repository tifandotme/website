"use client"

import { Sandpack as _Sandpack } from "@codesandbox/sandpack-react"
import React from "react"

export function Sandpack({
  options,
  ...props
}: React.ComponentProps<typeof _Sandpack>) {
  return (
    <_Sandpack
      options={{
        resizablePanels: false,
        editorWidthPercentage: 60,
        editorHeight: 400,
        ...options,
      }}
      theme={{
        colors: {
          surface1: "hsl(var(--codeblock-background))",
          surface2: "hsl(var(--codeblock-background))",
          surface3: "hsl(var(--codeblock-background))",
          clickable: "hsl(var(--muted-small-text))",
          base: "hsl(var(--foreground))",
          disabled: "hsl(var(--muted-small-text))",
          hover: "hsl(var(--foreground))",
          accent: "hsl(var(--foreground))",
          error: "#ff453a",
          errorSurface: "#ffeceb",
        },
        syntax: {
          keyword: "var(--keyword)",
          property: "var(--property)",
          plain: "var(--plain)",
          static: "var(--static)",
          string: "var(--string)",
          definition: "var(--definition)",
          punctuation: "var(--punctuation)",
          tag: "var(--tag)",
          comment: {
            color: "var(--comment)",
            fontStyle: "italic",
          },
        },
        font: {
          body: "var(--font-sans)",
          mono: "var(--font-mono)",
          size: "0.875rem",
          lineHeight: "1.25rem",
        },
      }}
      {...props}
    />
  )
}
