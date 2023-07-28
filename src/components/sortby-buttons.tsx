"use client"

import { useRouter } from "next/navigation"
import cn from "clsx"
import { LuCalendarDays } from "react-icons/lu"
import { PiStarBold } from "react-icons/pi"

export function SortByButtons({
  sortParam,
  ...props
}: { sortParam: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  return (
    <>
      <button
        {...props}
        onClick={() =>
          router.replace(`/projects?sort=date`, {
            scroll: false,
          })
        }
        className={cn(
          "inline-flex items-center gap-2 p-3 transition-transform hover:text-foreground active:translate-y-0.5",
          sortParam === "stars" ? "text-muted-darker" : "text-foreground",
        )}
      >
        <LuCalendarDays size={19} />
        by Date
      </button>

      <button
        {...props}
        onClick={() =>
          router.replace(`/projects?sort=stars`, {
            scroll: false,
          })
        }
        className={cn(
          "inline-flex items-center gap-2 p-3 transition-transform hover:text-foreground active:translate-y-0.5",
          sortParam === "stars" ? "text-foreground" : "text-muted-darker",
        )}
      >
        <PiStarBold size={19} />
        by Stars
      </button>
    </>
  )
}
