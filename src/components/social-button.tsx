import React from "react"
import { type IconType } from "react-icons"

import { cn } from "@/lib/utils"

type SocialButtonProps = {
  icon: IconType
  label: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export function SocialButton({ icon, label, ...props }: SocialButtonProps) {
  const iconElement = icon({ size: "1.1em", "aria-hidden": true })

  return (
    <a
      className={cn(
        "group inline-flex flex-col items-center justify-center gap-2 rounded-lg border px-6 py-4 hover:-translate-y-1 hover:transition active:scale-95 sm:flex-row sm:gap-3 sm:px-4",

        props.target === "_blank" && "cursor-ne-resize",
      )}
      data-umami-event={label + " button"}
      {...props}
    >
      <span className="group-hover:text-primary">{iconElement}</span>
      <span className="select-none text-base font-medium leading-[1.1em]">
        {label}
      </span>
    </a>
  )
}
