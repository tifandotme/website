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
      className="group inline-flex flex-col items-center justify-center gap-2 rounded-lg border px-6 py-4 hover:-translate-y-1 hover:transition active:scale-95 sm:flex-row sm:gap-3 sm:px-4"
      rel="noopener noreferrer"
      data-umami-event={text + " button"}
      {...props}
    >
      <span className="group-hover:text-primary">{iconElement}</span>
      <span className="select-none text-base font-medium leading-[1.1em]">
        {text}
      </span>
    </a>
  )
}
