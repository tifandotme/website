"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "px-2 py-1 transition hover:text-gray-900 active:translate-y-0.5",
            pathname === href && "font-semibold text-gray-700"
          )}
        >
          {name}
        </Link>
      ))}
    </>
  );
}
