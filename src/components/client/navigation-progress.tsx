"use client"

import React from "react"
import { type NavigateOptions } from "next/dist/shared/lib/app-router-context"
import {
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
} from "next/navigation"
import NProgress, { type NProgressOptions } from "nprogress"

import { type PushStateInput } from "@/types"

// REF: https://github.com/Skyleen77/next-nprogress-bar

const config = {
  color: "hsl(var(--primary))",
  height: "2px",
  delay: 120,
  shallowRouting: true,
  options: {
    showSpinner: false,
    minimum: 0.2,
    trickleSpeed: 400,
  } satisfies Partial<NProgressOptions>,
}

const NavigationProgress = React.memo(
  () => {
    const { color, height, options, shallowRouting, delay } = config

    const styles = (
      <style>
        {`
          #nprogress {
            pointer-events: none;
          }
          
          #nprogress .bar {
            background: ${color};
          
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
          
            width: 100%;
            height: ${height};
          }
          
          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
            opacity: 1.0;
          
            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }
          
          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }
          
          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
          
            border: solid 2px transparent;
            border-top-color: ${color};
            border-left-color: ${color};
            border-radius: 50%;
          
            -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
          }
          
          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }
          
          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }
          
          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    )

    NProgress.configure(options || {})

    const pathname = usePathname()
    const searchParams = useSearchParams()

    React.useEffect(() => {
      NProgress.done()
    }, [pathname, searchParams])

    React.useEffect(() => {
      let timer: NodeJS.Timeout

      const startProgress = () => {
        timer = setTimeout(NProgress.start, delay)
      }

      const stopProgress = () => {
        clearTimeout(timer)
        NProgress.done()
      }

      const handleAnchorClick = (event: MouseEvent) => {
        const anchorElement = event.currentTarget as HTMLAnchorElement

        const targetUrl = new URL(anchorElement.href)
        const currentUrl = new URL(location.href)

        if (event.ctrlKey || event.shiftKey) return

        if (anchorElement.target === "_blank") return

        if (shallowRouting && isSameURL(targetUrl, currentUrl)) return

        if (targetUrl?.href === currentUrl?.href) return

        if (targetUrl.pathname === "/resume.pdf") return

        startProgress()
      }

      const handleMutation: MutationCallback = () => {
        const anchorElements = document.querySelectorAll("a")

        // only show nprogress for links that match the conditions
        const validAnchorELes = Array.from(anchorElements).filter(
          (anchor) =>
            anchor.href &&
            anchor.target !== "_blank" &&
            !anchor.href.startsWith("mailto") &&
            !anchor.download,
        )
        validAnchorELes.forEach((anchor) =>
          anchor.addEventListener("click", handleAnchorClick),
        )
      }

      const mutationObserver = new MutationObserver(handleMutation)
      mutationObserver.observe(document, { childList: true, subtree: true })

      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray: PushStateInput) => {
          stopProgress()
          return target.apply(thisArg, argArray)
        },
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return styles
  },
  () => true,
)

NavigationProgress.displayName = "NavigationProgress"

export function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      {/* warning: without Suspense, this error would occur: https://nextjs.org/docs/messages/deopted-into-client-rendering */}
      <React.Suspense fallback={null}>
        <NavigationProgress />
      </React.Suspense>
    </>
  )
}

export function useRouter() {
  const router = useNextRouter()

  function push(href: string, options?: NavigateOptions) {
    NProgress.start()
    return router.push(href, options)
  }

  return { ...router, push }
}

function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + "//" + target.host + target.pathname
  const cleanCurrent = current.protocol + "//" + current.host + current.pathname

  return cleanTarget === cleanCurrent
}
