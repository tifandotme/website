"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useEffect, useRef, useState } from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { Icon } from "../../_components/icon"
import { useMediaQuery } from "../../_hooks/use-media-query"
import { useScroll } from "../../_hooks/use-scroll"
import { cn } from "../../_lib/utils"

interface TableOfContentsProps {
  headings: { text: string; slug: string }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const drawerScrollableEl = useRef<HTMLUListElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isContentReady, setIsContentReady] = useState(false)

  const { position } = useScroll(
    isContentReady ? drawerScrollableEl.current : null,
  )

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setIsOpen(false)
  }, [isDesktop])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsContentReady(false)
    }
  }

  const handleAnimationEnd = (open: boolean) => {
    if (open) {
      setIsContentReady(true)
    }
  }

  if (isDesktop) {
    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DialogPrimitive.Trigger asChild>
          <Button onClick={() => setIsOpen(true)} />
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/70" />
          {/* match duration to .5s with vaul drawer */}
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[80vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-7 border bg-background p-6 shadow-lg duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <DialogPrimitive.Title className="text-lg font-bold leading-none tracking-tight">
              Table of Contents
            </DialogPrimitive.Title>

            <ul className="-mx-3 overflow-y-auto">
              {headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    className="flex cursor-default items-center text-balance px-3 py-2.5 leading-6 hover:bg-muted-darker/10 focus:bg-muted-darker/10 focus:outline-none"
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>

            <DialogPrimitive.Close className="absolute right-5 top-6 -m-2.5 rounded-full p-2.5 text-muted transition-opacity hover:bg-muted-darker/10 hover:opacity-100 disabled:pointer-events-none">
              <Icon id="cross" className="size-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      onAnimationEnd={handleAnimationEnd}
      setBackgroundColorOnScale={false}
      shouldScaleBackground
    >
      <DrawerPrimitive.Trigger asChild>
        <Button onClick={() => setIsOpen(true)} />
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[50vh] flex-col rounded-t-3xl border-t-2 bg-background pb-7",

            position.y > 0 &&
              "!bg-gradient-to-t from-background from-80% to-muted/10 to-95%",
          )}
        >
          <div
            className={cn(
              "mx-auto my-3 h-1.5 w-[80px] shrink-0 rounded-full bg-muted-darker/30",

              position.y > 0 && "bg-muted-darker/50",
            )}
          />
          <DrawerPrimitive.Title className="mb-7 text-center text-xl font-bold">
            Table of Contents
          </DrawerPrimitive.Title>
          <ul ref={drawerScrollableEl} className="overflow-y-auto px-3">
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  className="flex cursor-default focus:bg-muted-darker/10 focus:outline-none items-center justify-center text-balance px-3 py-2.5 text-center leading-6 hover:bg-muted-darker/10"
                  href={`#${heading.slug}`}
                  onClick={() => setIsOpen(false)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

function Button({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "-mx-1 inline-flex items-center justify-center px-4 py-3 leading-none text-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      <Icon id="list" className="mr-2 size-5" />
      Table of Contents
    </button>
  )
}
