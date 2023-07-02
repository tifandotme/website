import React from "react";
import { type IconType } from "react-icons";

type ExternalLinkProps = {
  href: string;
  icon: IconType;
  text: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({
  href,
  icon,
  text,
  ...props
}: ExternalLinkProps) {
  const iconElement = icon({ size: "1.1em" });

  return (
    <a
      className="group inline-flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-4 transition hover:-translate-y-1 active:scale-95 sm:flex-row sm:gap-3 sm:px-5"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      data-umami-event={text + " button"}
      {...props}
    >
      <span className="group-hover:text-[hsl(var(--accent))]">
        {iconElement}
      </span>
      <span className="text-base font-medium leading-[1.1em]">{text}</span>
    </a>
  );
}
