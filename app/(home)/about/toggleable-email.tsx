"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Icon } from "../../_components/icon"
import { cn } from "../../_lib/utils"

const EMAIL = process.env.NEXT_PUBLIC_EMAIL as string
const STORAGE_KEY = "email-unlocked"

type EmailVisibilityState = {
  isHidden: boolean
  isLoading: boolean
  isRendered: boolean
}

export function ToggleableEmail() {
  const [state, setState] = useState<EmailVisibilityState>({
    isHidden: process.env.NODE_ENV !== "development",
    isLoading: false,
    isRendered: false,
  })

  const captchaRef = useRef<HCaptcha | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const isVerified = localStorage.getItem(STORAGE_KEY) === "true"
      setState((prev) => ({
        ...prev,
        isRendered: true,
        isHidden: !isVerified,
      }))
    }
  }, [])

  useEffect(() => {
    console.log("isLoading", state.isLoading)
    if (state.isLoading) {
      document.body.style.cursor = "wait"
    } else {
      document.body.style.removeProperty("cursor")
    }
  }, [state.isLoading])

  const handleCaptchaClick = () => {
    if (state.isHidden) {
      setState((prev) => ({ ...prev, isLoading: true }))
      captchaRef.current?.execute()
    }
  }

  const handleCaptchaVerify = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setState((prev) => ({ ...prev, isHidden: false }))
  }

  const handleCaptchaOpen = () => {
    setState((prev) => ({ ...prev, isLoading: false }))
  }

  return (
    <button
      type="button"
      className={cn(
        "-m-0.5 inline-flex gap-0.5 p-0.5",
        state.isHidden &&
          "mx-0.5 bg-muted-darker/20 px-1 text-foreground/70 hover:cursor-pointer hover:bg-muted-darker/30",
        state.isLoading && "pointer-events-none",
      )}
      onClick={handleCaptchaClick}
    >
      {state.isHidden ?
        <>
          <Icon id="lock" className="size-[1em] translate-y-1" />
          <span>Show email</span>
        </>
      : <a className="font-semibold hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      }

      {state.isRendered &&
        createPortal(
          <HCaptcha
            ref={captchaRef}
            cleanup
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
            onOpen={handleCaptchaOpen}
            onVerify={handleCaptchaVerify}
          />,
          document.body,
        )}
    </button>
  )
}
