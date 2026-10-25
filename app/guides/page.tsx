import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "#site/content";
import { Arrow } from "@/components/icons";
export const metadata: Metadata = { title: "Guides & help", description: "Get started with Clip Insights. Learn about video notes, screenshots, AI, PDF exports and troubleshooting.", alternates: { canonical: "/guides" } };
export default function GuidesPage() {
  return <div className="content-page"><header className="page-heading"><p className="eyebrow">A LITTLE GUIDANCE GOES A LONG WAY</p><h1>From your first note<br/>to your next insight.</h1><p>Practical instructions for getting more out of a video, with clear answers when something gets in the way.</p></header><div className="guide-grid">{guides.toSorted((a,b) => a.order - b.order).map((guide) => <Link className="guide-link" href={`/guides/${guide.slug}`} key={guide.slug}><p className="eyebrow">{guide.order === 1 ? "START HERE" : "PRODUCT GUIDE"}</p><h2>{guide.title}<Arrow/></h2><p>{guide.excerpt}</p></Link>)}</div><div className="notice">Still stuck? <Link href="/contact" className="text-link">Get in touch →</Link></div></div>;
}
