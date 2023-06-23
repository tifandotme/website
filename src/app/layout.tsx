import "@/app/globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s - tifan.me",
    default: "tifan.me",
  },
  description: "A blog",
  creator: "Tifan Dwi Avianto",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* <script
        async
        src="https://analytics.tifan.me/script.js"
        data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
      /> */}
      <body>
        <div className="mx-auto max-w-2xl px-4 py-10">
          <header className="mt-32 flex flex-col items-start">
            <h1 className="mb-4 text-4xl font-extrabold">
              <Link href="/">Tifan</Link>
            </h1>
            <p className="mb-4 text-lg">
              Welcome to my online hideout where I share my insights on all
              things web development.
            </p>
            <p className="text-lg">
              Find me on: <a href="https://twitter.com/tifandotme">Twitter</a>{" "}
              or <a href="https://github.com/tifandotme/">GitHub</a>
            </p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
