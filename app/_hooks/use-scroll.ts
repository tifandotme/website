import { useLayoutEffect, useState } from "react"

const INITIAL_POSITION = {
  x: 0,
  y: 0,
}

export function useScroll(el: HTMLElement | null) {
  const [position, setPosition] = useState(INITIAL_POSITION)

  useLayoutEffect(() => {
    if (!el) {
      setPosition(INITIAL_POSITION)
      return
    }

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
