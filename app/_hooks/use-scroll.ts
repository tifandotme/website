import { useLayoutEffect, useState } from "react"

export function useScroll(el: HTMLElement | null) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useLayoutEffect(() => {
    if (!el) return

    const handleScroll = () => {
      setPosition({
        y: el.scrollTop,
        x: el.scrollLeft,
      })
    }

    el.addEventListener("scroll", handleScroll)

    return () => {
      el.removeEventListener("scroll", handleScroll)
    }
  }, [el])

  return { position }
}
