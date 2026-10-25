import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { ContactDetails } from "@/components/contact-details";
import { DeveloperContacts } from "@/components/developer-contacts";
import { ContactPage } from "@/components/contact-page";
import { ReadingAside } from "@/components/reading-aside";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return pages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = pages.find((candidate) => candidate.slug === slug);
  if (!match) notFound();
  return { title: match.title, description: match.excerpt, alternates: { canonical: `/${slug}` } };
}
export default async function InformationPage({ params }: Props) {
  const { slug } = await params;
  const page = pages.find((candidate) => candidate.slug === slug);
  if (!page) notFound();
  if (slug === "contact") return <ContactPage title={page.title} description={page.excerpt}/>;
  return <div className="content-page"><header className="page-heading"><p className="eyebrow">CLIP INSIGHTS / {slug.toUpperCase()}</p><h1>{page.title}</h1><p>{page.excerpt}</p></header><div className="reading-layout"><div className="prose"><MDXContent code={page.content} components={{ ContactDetails, DeveloperContacts }}/></div><ReadingAside/></div></div>;
}
