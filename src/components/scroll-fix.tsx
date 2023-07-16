"use client"

import React from "react"

// https://github.com/vercel/next.js/issues/42492
export function ScrollUpWhenMounted() {
  React.useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return null
}
