import type { iconIds } from "@/config"

interface IconProps extends React.SVGAttributes<SVGElement> {
  id: (typeof iconIds)[number]
}

export function Icon({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )
}
