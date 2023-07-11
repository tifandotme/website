import React from "react"
import cn from "clsx"
import { useIntersection } from "react-use"

// https://react-svgr.com/

export function Logo({
  intersectionRef,
  ...props
}: {
  intersectionRef: React.RefObject<HTMLElement>
} & React.SVGProps<SVGSVGElement>) {
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  const isActive = !intersection?.isIntersecting

  // TODO: add enter animation on logo (like leerob.io), probably need to use rect tag
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      className={cn(
        "text-[2.6rem] text-gray-400 transition hover:text-gray-700",
        isActive && "lg:text-gray-600",
      )}
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M1940-2312h510v520h-510zM110-2312h510v520H110zM1025-2312h510v2136h-510z"
          transform="matrix(.1 0 0 .1 0 253)"
        />
      </g>
    </svg>
  )
}
