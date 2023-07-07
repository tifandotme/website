import Link from "next/link";

import { Navigation } from "@/components/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="container flow-root px-6 py-16 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="absolute select-none text-5xl font-semibold leading-9  text-gray-400 transition hover:text-gray-700 active:translate-y-0.5 lg:fixed"
        >
          T
        </Link>
        <div className="float-right inline-flex gap-5 text-lg font-medium text-gray-400">
          <Navigation />
        </div>
      </nav>
      {children}
    </>
  );
}
