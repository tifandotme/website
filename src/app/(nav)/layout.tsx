import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flow-root p-16">
        <Link
          href="/"
          className="absolute select-none text-5xl font-semibold leading-9 text-gray-500 hover:text-black lg:fixed"
        >
          T
        </Link>
        <div className="float-right inline-flex gap-5 text-lg font-medium text-gray-600">
          <Link href="/blog" className="px-2 py-1 hover:text-black">
            Blog
          </Link>
          <Link href="/projects" className="px-2 py-1 hover:text-black">
            Projects
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
