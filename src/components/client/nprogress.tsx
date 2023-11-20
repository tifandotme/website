"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useNProgress } from "@tanem/react-nprogress"

// NOTE in case I need to implement a proxy of useRouter that starts a progress bar
// https://github.com/Skyleen77/next-nprogress-bar/blob/main/src/appDir.tsx

function ProgressBar({ isAnimating }: { isAnimating: boolean }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className="fixed left-0 top-0 z-50 h-[2px] w-full bg-[hsl(var(--primary))]"
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className="absolute right-0 block h-full w-[100px] translate-y-[-4px] rotate-3 opacity-100 shadow-[0_0_10px_var(--primary),_0_0_5px_var(--primary)]" />
      </div>
    </div>
  )
}

const NProgress = React.memo(() => {
  const [state, setState] = React.useState({
    isAnimating: false,
    key: 0,
  })

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const timerId = React.useRef<NodeJS.Timeout>()

  const startProgress = () => {
    console.log("startProgress")

    timerId.current = setTimeout(() => {
      setState((prevState) => ({
        isAnimating: true,
        key: prevState.key ^ 1,
      }))
    }, 120)
  }

  const stopProgress = () => {
    timerId.current && clearTimeout(timerId.current)

    setState((prevState) => ({
      isAnimating: false,
      key: prevState.key,
    }))
  }

  React.useEffect(() => {
    stopProgress()
  }, [pathname, searchParams])

  React.useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement

      if (event.ctrlKey || event.metaKey) return

      const targetUrl = new URL(anchorElement.href)
      const currentUrl = new URL(location.href)

      if (targetUrl.href === currentUrl.href) return

      startProgress()
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a")

      const validAnchorElements = Array.from(anchorElements).filter(
        (anchor) =>
          anchor.href &&
          anchor.target !== "_blank" &&
          !anchor.href.startsWith("mailto") &&
          !anchor.href.endsWith("pdf") &&
          !anchor.download,
      )
      validAnchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      )
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    return () => {
      clearTimeout(timerId.current)
      mutationObserver.disconnect()
    }
  }, [])

  return <ProgressBar isAnimating={state.isAnimating} key={state.key} />
})

NProgress.displayName = "NProgress"

export function NProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <React.Suspense fallback={null}>
        <NProgress />
      </React.Suspense>
    </>
  )
}
