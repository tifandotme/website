import { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tifan.me",
  description: "A blog",
  creator: "Tifan Dwi Avianto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://analytics.tifan.me/script.js"
          data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
        ></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
