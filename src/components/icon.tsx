import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  id: string
}

export function Icon({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )
}
