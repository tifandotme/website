"use client"

import { useState } from "react"
import { Icon } from "../../_components/icon"
import { cn } from "../utils"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2500)
  }

  return (
    <button
      type="button"
      disabled={isCopied}
      onClick={copy}
      data-copied={isCopied}
      className={cn(
        "no-js absolute top-0 right-0 z-10 inline-flex size-10 cursor-default items-center justify-center text-muted-darker data-[copied=false]:hover:text-foreground print:hidden",
        className,
      )}
      title="Copy code"
      {...props}
    >
      <Icon
        id={isCopied ? "check" : "copy"}
        className={cn(
          isCopied ? "size-5" : "size-4",
          "bg-[var(--prose-pre-bg)]",
        )}
      />
    </button>
  )
}
