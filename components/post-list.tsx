import type { Post } from "#site/content";
import { authors, tags } from "#site/content";
import Link from "next/link";
import { getBlogPageHref } from "@/lib/content";
import { readingMinutes } from "@/lib/article";
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle:"long", timeZone:"UTC" });
export function PostList({ posts, emptyMessage = "No posts found." }: { posts: readonly Post[]; emptyMessage?: string }) {
  if (!posts.length) return <p>{emptyMessage}</p>;
  return <div className="post-list">{posts.map((post) => {
    const author = authors.find(({ slug }) => slug === post.author);
    return <article key={post.slug}><p className="post-meta"><time dateTime={post.publishedDate}>{dateFormatter.format(new Date(post.publishedDate))}</time> · {readingMinutes(post.raw)} min read {author && <> · <Link href={`/blog/author/${author.slug}`}>{author.name}</Link></>}</p><h2><Link href={post.permalink}>{post.title}</Link></h2><p>{post.excerpt}</p><ul className="article-tags" aria-label="Tags">{post.tags.map((slug) => { const tag = tags.find((item) => item.slug === slug); return tag ? <li key={slug}><Link href={`/blog/tag/${slug}`}>{tag.name}</Link></li> : null; })}</ul></article>;
  })}</div>;
}
export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  return <nav className="pagination" aria-label="Blog pagination">{currentPage > 1 ? <Link href={getBlogPageHref(currentPage - 1)}>← Previous</Link> : <span/>}<span>Page {currentPage} of {totalPages}</span>{currentPage < totalPages ? <Link href={getBlogPageHref(currentPage + 1)}>Next →</Link> : <span/>}</nav>;
}
