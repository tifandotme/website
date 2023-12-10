"use client"

import { useRouter } from "next/navigation"

import type { HeadingItem } from "@/types"

interface HeadingLinkProps extends React.LiHTMLAttributes<HTMLLIElement> {
  heading: HeadingItem
}

export function HeadingLink({ heading, ...props }: HeadingLinkProps) {
  const router = useRouter()

  const scrollIntoView = () => {
    router.push(`#${heading.slug}`, { scroll: false })
    document
      .getElementById(heading.slug)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <li
      onClick={(e) => {
        e.preventDefault()

        scrollIntoView()
      }}
      onKeyDown={(e) => {
        e.preventDefault()

        if (e.key === "Enter") {
          scrollIntoView()
        }
      }}
      {...props}
    >
      {heading.text}
    </li>
  )
}
