"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

/**
 * @see https://umami.is/docs/exclude-my-own-visits
 */
export function FloatingUmamiIndicator() {
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    setIsDisabled(window.localStorage.getItem("umami.disabled") === "1")
  }, [])

  if (!isDisabled) {
    return null
  }

  return createPortal(
    <div
      className="fixed bottom-4 left-4 z-50 select-none py-1 text-sm leading-6"
      role="status"
      aria-live="polite"
    >
      Umami is disabled
    </div>,
    document.body,
  )
}