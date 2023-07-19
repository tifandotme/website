"use client"

import React from "react"

/**
 * next/link component will not scroll to top when navigating to a new page. This will fix that.
 *
 * @see https://github.com/vercel/next.js/issues/42492
 */
export function ScrollUpWhenMounted() {
  React.useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return null
}
