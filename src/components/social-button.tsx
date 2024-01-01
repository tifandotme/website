import React from "react"

import type { iconIds } from "@/config"
import { Icon } from "@/components/icon"

// prettier-ignore
interface SocialButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  iconId: typeof iconIds[number]
  label: string
}

export function SocialButton({ iconId, label, ...props }: SocialButtonProps) {
  return (
    <a
      className="group inline-flex flex-col items-center justify-center gap-2 rounded-lg border px-6 py-4 hover:-translate-y-1 hover:transition active:scale-95 sm:flex-row sm:gap-3 sm:px-4"
      data-umami-event={label + " button"}
      {...props}
    >
      <Icon
        id={iconId}
        className="h-[1.1em] w-[1.1em] group-hover:text-primary"
        aria-hidden
      />
      <span className="select-none text-base font-medium leading-[1.1em]">
        {label}
      </span>
    </a>
  )
}
