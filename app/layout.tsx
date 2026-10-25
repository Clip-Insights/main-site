import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = localFont({ src: [{ path: "../public/fonts/inter-regular.woff2", weight: "400", style: "normal" }, { path: "../public/fonts/inter-semibold.woff2", weight: "600", style: "normal" }, { path: "../public/fonts/inter-bold.woff2", weight: "700", style: "normal" }], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), title: { default: `${SITE_NAME} — YouTube notes, screenshots & AI insights`, template: `%s | ${SITE_NAME}` }, description: SITE_DESCRIPTION,
  openGraph: { type: "website", siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION, url: SITE_URL, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Clip Insights — turn YouTube videos into notes you can use" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  alternates: { types: { "application/rss+xml": "/rss.xml" } }, icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={inter.variable}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main" className="site-main" tabIndex={-1}>{children}</main><SiteFooter/></body></html>;
}
