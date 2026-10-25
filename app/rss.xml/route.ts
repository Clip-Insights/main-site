import { posts } from "#site/content";
import { getPublishedPosts } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
const xml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);
export const dynamic = "force-static";
export function GET() {
  const items = getPublishedPosts(posts).map((post) => `<item><title>${xml(post.title)}</title><link>${SITE_URL}${post.permalink}</link><guid isPermaLink="true">${SITE_URL}${post.permalink}</guid><pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate><description>${xml(post.excerpt)}</description></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(SITE_NAME)}</title><link>${SITE_URL}</link><description>${xml(SITE_DESCRIPTION)}</description><language>en</language><atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
