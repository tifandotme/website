"use client"

import { useRouter } from "next/navigation"

import { HeadingsField } from "@/types"

export function HeadingsLinks({
  headings,
  ...props
}: {
  headings: HeadingsField
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter()

  return (
    <>
      {headings.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          onClick={(e) => {
            e.preventDefault()

            router.push(`#${heading.slug}`, { scroll: false })
            document
              .getElementById(heading.slug)
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          {...props}
        >
          {heading.text}
        </a>
      ))}
    </>
  )
}
