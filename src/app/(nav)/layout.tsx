import Link from "next/link";

import { Navigation } from "@/components/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="container flow-root p-6 pt-10 sm:p-10 lg:p-16 ">
        <Link
          href="/"
          className="absolute select-none text-5xl font-semibold leading-9  text-gray-500 transition hover:text-gray-700 active:translate-y-0.5 lg:fixed"
        >
          T
        </Link>
        <div className="float-right inline-flex gap-5 text-lg font-medium text-gray-500">
          <Navigation />
        </div>
      </nav>
      <main className="mx-auto my-10 max-w-3xl p-3 sm:p-5">{children}</main>
    </>
  );
}
