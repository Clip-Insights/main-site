import { authors, posts, tags, guides, pages } from "#site/content";
import type { MetadataRoute } from "next";

import { getPublishedPosts, getReferencedSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = getPublishedPosts(posts);
  const authorSlugs = getReferencedSlugs(
    publishedPosts.map(({ author }) => author),
    authors.map(({ slug }) => slug),
  );
  const tagSlugs = getReferencedSlugs(
    publishedPosts.flatMap(({ tags }) => tags),
    tags.map(({ slug }) => slug),
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...["/features", "/guides", ...guides.map(({ slug }) => `/guides/${slug}`), ...pages.map(({ slug }) => `/${slug}`)].map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...publishedPosts.map((post) => ({
      url: `${SITE_URL}${post.permalink}`,
      lastModified: post.updatedDate ?? post.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Array.from(authorSlugs, (slug) => ({
      url: `${SITE_URL}/blog/author/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...Array.from(tagSlugs, (slug) => ({
      url: `${SITE_URL}/blog/tag/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
