import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

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
      <script
        async
        src="https://analytics.tifan.me/script.js"
        data-website-id="7edd9838-f991-48d3-aa41-c7fe0cd55d36"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
