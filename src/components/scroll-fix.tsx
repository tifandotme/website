"use client"

import React from "react"

/**
 * next/link component will not scroll to top when navigating to a new page. This will scroll to top when the component is mounted.
 *
 * @see https://github.com/vercel/next.js/issues/42492
 */
export function ScrollUpWhenMounted() {
  React.useEffect(
    () =>
      window.document.scrollingElement?.scrollTo({
        top: 0,
        behavior: "instant",
      }),
    [],
  )

  return null
}
