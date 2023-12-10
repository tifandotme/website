"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

// prettier-ignore
interface SortByButtonsProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  sortParam: string
}

export function SortByButtons({ sortParam, ...props }: SortByButtonsProps) {
  const router = useRouter()

  return (
    <>
      <a
        {...props}
        href="/projects?sort=date"
        onClick={(e) => {
          e.preventDefault()
          router.replace(`/projects?sort=date`, {
            scroll: false,
          })
        }}
        className={cn(
          "my-1 inline-flex items-center gap-2 p-3 transition-transform hover:text-foreground active:translate-y-0.5",

          sortParam === "stars" ? "text-muted-darker" : "text-foreground",
        )}
        aria-label="Sort by date"
      >
        <Icons.Calendar className="h-4 w-4" />
        by Date
      </a>

      <a
        {...props}
        href="/projects?sort=stars"
        onClick={(e) => {
          e.preventDefault()
          router.replace(`/projects?sort=stars`, {
            scroll: false,
          })
        }}
        className={cn(
          "my-1 inline-flex items-center gap-2 p-3 transition-transform hover:text-foreground active:translate-y-0.5",
          sortParam === "stars" ? "text-foreground" : "text-muted-darker",
        )}
        aria-label="Sort by stars"
      >
        <Icons.Star className="h-4 w-4" />
        by Stars
      </a>
    </>
  )
}
