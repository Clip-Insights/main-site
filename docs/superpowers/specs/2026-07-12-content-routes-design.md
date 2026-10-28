# Content Routes Design

## Scope

Implement Phase 2 only: public blog, post, author, and tag routes backed by Velite, plus metadata, sitemap, and robots files. Search, comments, redirects, and image migration behavior remain deferred to later phases.

## Content access

- Add a small shared content module for published-post filtering, newest-first sorting, relation lookups, and pagination.
- Exclude drafts from every public list, static parameter set, sitemap entry, and direct post route.
- Use ten posts per blog index page.
- Read pagination from `/blog?page=<number>` and return a not-found response for invalid or out-of-range pages.

## Routes

- `/blog` lists published posts newest first and renders previous/next pagination links.
- `/blog/[slug]` renders compiled Velite MDX and uses `generateStaticParams`.
- `/blog/author/[slug]` resolves an author and lists that author's published posts.
- `/blog/tag/[slug]` resolves a tag and lists published posts containing that tag.
- Unknown authors, tags, and posts return the App Router not-found response.

## Metadata

- Set the site metadata base to `https://clipinsights.org`.
- Blog, author, and tag routes receive descriptive route-specific metadata and canonical URLs.
- Post metadata uses `seoTitle`, `seoDescription`, and `canonicalUrl` when supplied, falling back to `title`, `excerpt`, and the generated post permalink.

## Discovery files

- Generate `app/sitemap.ts` from published posts, including the blog index and referenced author/tag pages.
- Generate `app/robots.ts` allowing public crawling and linking to the sitemap.

## Presentation

- Use a minimal neutral Tailwind layout and reusable post-card/pagination presentation.
- Do not introduce a custom Tailwind design system or brand tokens.
- Keep semantic headings, navigation labels, article structure, and readable focus states.

## Verification

- Validate generated content with `npx velite`.
- Run ESLint, TypeScript, and a production Next.js build.
- Confirm the generated build includes the expected blog, post, author, tag, sitemap, and robots routes.
