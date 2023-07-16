"use client"

import React from "react"
import cn from "clsx"

export function NameToggle() {
  const [clicked, setClicked] = React.useState(false)

  return (
    <span
      className={cn(
        "font-serif text-xl font-semibold",
        clicked
          ? "cursor-default"
          : "cursor-pointer hover:underline hover:underline-offset-4",
      )}
      onClick={() => setClicked(true)}
    >
      {clicked ? "Tifan Dwi Avianto" : "Tifan"}
    </span>
  )
}
