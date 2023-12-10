import React from "react"

import { Icons } from "@/components/icons"

// prettier-ignore
interface SocialButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: keyof typeof Icons
  label: string
}

export function SocialButton({ icon, label, ...props }: SocialButtonProps) {
  const Icon = Icons[icon]

  return (
    <a
      className="group inline-flex flex-col items-center justify-center gap-2 rounded-lg border px-6 py-4 hover:-translate-y-1 hover:transition active:scale-95 sm:flex-row sm:gap-3 sm:px-4"
      data-umami-event={label + " button"}
      {...props}
    >
      <Icon
        className="h-[1.1em] w-[1.1em] group-hover:text-primary"
        aria-hidden
      />
      <span className="select-none text-base font-medium leading-[1.1em]">
        {label}
      </span>
    </a>
  )
}
