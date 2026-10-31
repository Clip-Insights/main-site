import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { RelatedReading } from "@/components/related-reading";
import { ReadingAside } from "@/components/reading-aside";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const guide = guides.find((item) => item.slug === slug); if (!guide) notFound(); return { title: guide.title, description: guide.excerpt, alternates: { canonical: `/guides/${slug}` } }; }
export default async function GuidePage({ params }: Props) {
  const { slug } = await params; const guide = guides.find((item) => item.slug === slug); if (!guide) notFound();
  return <div className="content-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span aria-current="page">{guide.title}</span></nav><header className="article-header"><p className="eyebrow">PRODUCT GUIDE</p><h1>{guide.title}</h1><p>{guide.excerpt}</p></header><div className="reading-layout"><div><div className="prose"><MDXContent code={guide.content}/></div><div className="article-bottom related-section"><h2>Keep going</h2><p>A useful next step for your study session.</p><RelatedReading items={guides.filter((item) => item.slug !== slug).map(item => ({ href: `/guides/${item.slug}`, title: item.title, excerpt: item.excerpt }))}/></div></div><ReadingAside/></div></div>;
}
