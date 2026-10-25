import { defineConfig, defineCollection, s } from 'velite';

// ---------------------------------------------------------------------------
// Posts — maps to WP `post` post type
// ---------------------------------------------------------------------------
const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(200),
      slug: s.slug('posts'), // unique across posts, derived from filename unless overridden
      publishedDate: s.isodate(),
      updatedDate: s.isodate().optional(),
      draft: s.boolean().default(false),

      // relationships — store the referenced slug, resolve at query time
      author: s.string(), // authors/<slug>.md
      tags: s.array(s.string()).default([]), // tags/<slug>.md

      excerpt: s.string().max(400),
      coverImage: s.image().optional(),
      coverImageAlt: s.string().optional(),

      // SEO — carried over from Yoast/RankMath fields in WP
      seoTitle: s.string().max(70).optional(),
      seoDescription: s.string().max(160).optional(),
      canonicalUrl: s.string().url().optional(),

      // preserves the original WP URL for redirect-map generation
      legacyWpSlug: s.string().optional(),
      legacyWpId: s.number().optional(),

      content: s.mdx(), // compiled MDX body
      raw: s.raw(), // raw markdown, useful for search indexing (e.g. Pagefind)
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/${data.slug}`,
    })),
});

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------
const authors = defineCollection({
  name: 'Author',
  pattern: 'authors/**/*.md',
  schema: s.object({
    name: s.string(),
    slug: s.slug('authors'),
    avatar: s.image().optional(),
    bio: s.string().optional(),
    twitter: s.string().optional(),
    content: s.markdown().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------
const tags = defineCollection({
  name: 'Tag',
  pattern: 'tags/**/*.md',
  schema: s.object({
    name: s.string(),
    slug: s.slug('tags'),
    description: s.string().optional(),
  }),
});

const guides = defineCollection({
  name: 'Guide', pattern: 'guides/**/*.mdx',
  schema: s.object({ title: s.string().max(160), slug: s.slug('guides'), excerpt: s.string().max(400), order: s.number(), content: s.mdx(), raw: s.raw() }),
});
const pages = defineCollection({
  name: 'Page', pattern: 'pages/**/*.mdx',
  schema: s.object({ title: s.string().max(160), slug: s.slug('pages'), excerpt: s.string().max(400), content: s.mdx(), raw: s.raw() }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, authors, tags, guides, pages },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
