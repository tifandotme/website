"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { Icon } from "../../_components/icon"
import { useMediaQuery } from "../../_hooks/use-media-query"
import { cn } from "../../_lib/utils"

interface TableOfContentsProps {
  headings: { text: string; slug: string }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setIsOpen(false)
  }, [isDesktop])

  if (isDesktop) {
    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button onClick={() => setIsOpen(true)} />
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/70" />
          {/* match duration to .5s with vaul drawer */}
          <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-7 border bg-background p-6 shadow-lg duration-500">
            <DialogPrimitive.Title className="text-lg font-bold leading-none tracking-tight">
              Table of Contents
            </DialogPrimitive.Title>

            <ul>
              {headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    className="-mx-3 flex h-10 cursor-default items-center px-3 hover:bg-muted-darker/10"
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>

            <DialogPrimitive.Close className="focus:ring-ring absolute right-5 top-6 -m-2.5 rounded-full p-2.5 text-muted ring-offset-background transition-opacity hover:bg-muted-darker/10 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
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
      onOpenChange={setIsOpen}
      setBackgroundColorOnScale={false}
      shouldScaleBackground
    >
      <DrawerPrimitive.Trigger asChild>
        <Button onClick={() => setIsOpen(true)} />
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-background/70" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col border-t-2 bg-background px-5 pb-7">
          <div className="mx-auto my-4 h-2 w-[100px] rounded-full bg-muted-darker/30" />
          <DrawerPrimitive.Title className="mb-7 text-center text-lg font-bold">
            Table of Contents
          </DrawerPrimitive.Title>
          <ul>
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  className="flex h-11 cursor-default items-center justify-center hover:bg-muted-darker/10"
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
        "-mx-1 inline-flex items-center justify-center px-4 py-3 leading-none text-muted outline-none hover:text-foreground",
        className,
      )}
      aria-label="Table of Contents"
      {...props}
    >
      <Icon id="list" className="mr-2 size-5" />
      Table of Contents
    </button>
  )
}
