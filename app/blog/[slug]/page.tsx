import { authors, posts, tags } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { getPublishedPost, getPublishedPosts } from "@/lib/content";
import { articleHeadings, readingMinutes } from "@/lib/article";
import { SITE_NAME, SITE_URL, STORE_URL } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
export const dynamicParams = false;
export function generateStaticParams() { return getPublishedPosts(posts).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPublishedPost(posts, (await params).slug); if (!post) notFound();
  const title = post.seoTitle ?? post.title; const description = post.seoDescription ?? post.excerpt;
  return { title, description, alternates: { canonical: post.permalink }, openGraph: { type: "article", title, description, url: post.permalink, publishedTime: post.publishedDate, modifiedTime: post.updatedDate, images: ["/opengraph-image"] } };
}
export default async function PostPage({ params }: Props) {
  const post = getPublishedPost(posts, (await params).slug); if (!post) notFound();
  const author = authors.find(({ slug }) => slug === post.author);
  const headings = articleHeadings(post.raw);
  const related = getPublishedPosts(posts).filter((item) => item.slug !== post.slug).slice(0,3);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: post.publishedDate, dateModified: post.updatedDate ?? post.publishedDate, mainEntityOfPage: `${SITE_URL}${post.permalink}`, image: `${SITE_URL}/opengraph-image`, author: { "@type": "Organization", name: author?.name ?? SITE_NAME, url: `${SITE_URL}/about` }, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g,"\\u003c") }}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span aria-current="page">{post.title}</span></nav>
    <header className="article-header"><div className="article-meta"><Link href="/blog/author/root">{author?.name ?? SITE_NAME}</Link><span>·</span><time dateTime={post.publishedDate}>{dateFormatter.format(new Date(post.publishedDate))}</time><span>·</span><span>{readingMinutes(post.raw)} min read</span>{post.updatedDate && <><span>·</span><span>Updated {dateFormatter.format(new Date(post.updatedDate))}</span></>}</div><h1>{post.title}</h1><p>{post.excerpt}</p></header>
    <div className="reading-layout"><div><ArticleBody code={post.content}/><div className="article-bottom"><p className="eyebrow">KEEP EXPLORING</p><h2 style={{ fontSize:28 }}>For your next session.</h2><div className="related-links">{related.map((item) => <Link className="text-link" key={item.slug} href={item.permalink}>{item.title} →</Link>)}</div><ul className="article-tags" aria-label="Article tags">{post.tags.map((slug) => { const tag = tags.find((item) => item.slug === slug); return tag ? <li key={slug}><Link href={`/blog/tag/${slug}`}>{tag.name}</Link></li> : null; })}</ul></div></div><aside className="reading-aside"><h2>In this article</h2><nav aria-label="Article contents">{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav><div className="article-bottom"><p>Try the ideas on your next YouTube video.</p><a className="button button-small" href={STORE_URL}>Add to Chrome</a></div></aside></div>
  </article>;
}
