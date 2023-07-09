import React from "react"
import { type IconType } from "react-icons"

type SocialButtonProps = {
  icon: IconType
  text: string
} & React.HTMLProps<HTMLAnchorElement>

export function SocialButton({ icon, text, ...props }: SocialButtonProps) {
  const iconElement = icon({ size: "1.1em" })

  return (
    <a
      className="group inline-flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-4 transition hover:-translate-y-1 active:scale-95 sm:flex-row sm:gap-3 sm:px-5"
      rel="noopener noreferrer"
      data-umami-event={text + " button"}
      {...props}
    >
      <span className="group-hover:text-[hsl(var(--accent))]">
        {iconElement}
      </span>
      <span className="text-base font-medium leading-[1.1em]">{text}</span>
    </a>
  )
}
