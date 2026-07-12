import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <header className="border-b border-zinc-200">
          <nav
            className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5"
            aria-label="Main navigation"
          >
            <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
              <Image
                src="/logo-light.svg"
                alt=""
                width={28}
                height={28}
                priority
              />
              <span>{SITE_NAME}</span>
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/blog">
              Blog
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-4xl px-6 py-8 text-sm text-zinc-500">
            © {new Date().getUTCFullYear()} {SITE_NAME}
          </div>
        </footer>
      </body>
    </html>
  );
}
