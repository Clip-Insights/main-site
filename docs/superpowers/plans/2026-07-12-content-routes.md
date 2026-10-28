# Content Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add public, metadata-rich blog routes backed entirely by validated Velite content.

**Architecture:** Pure content helpers own filtering, sorting, relation lookup, and pagination. App Router server pages consume those helpers, reusable presentational components render lists and MDX, and metadata route files expose sitemap and robots output.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript, Tailwind CSS 4, Velite, Node test runner.

---

### Task 1: Test and implement content queries

**Files:**
- Create: `lib/content.test.ts`
- Create: `lib/content.ts`
- Modify: `package.json`

- [ ] **Step 1: Add failing tests**

Test that content helpers:

```ts
// Filter drafts and sort newest first.
assert.deepEqual(getPublishedPosts(samplePosts).map(({ slug }) => slug), [
  "newest",
  "oldest",
]);

// Return deterministic page slices.
assert.deepEqual(paginatePosts(samplePosts, 2, 1), {
  items: [samplePosts[1]],
  currentPage: 2,
  totalPages: 3,
});

// Filter by author and tag.
assert.equal(getPostsByAuthor(samplePosts, "team").length, 2);
assert.equal(getPostsByTag(samplePosts, "updates").length, 1);
```

- [ ] **Step 2: Verify the tests fail**

Run: `node --test lib/content.test.ts`

Expected: failure because `lib/content.ts` does not exist.

- [ ] **Step 3: Implement the minimal helpers**

Export `POSTS_PER_PAGE`, `getPublishedPosts`, `getPublishedPost`, `getPostsByAuthor`, `getPostsByTag`, and `paginatePosts`. Keep functions pure by accepting post arrays, while exporting ready-to-use published collections derived from Velite.

- [ ] **Step 4: Add the test script and verify green**

Add `"test": "node --test lib/*.test.ts"` to `package.json`.

Run: `npm test`

Expected: all content helper tests pass.

### Task 2: Add shared presentation and site configuration

**Files:**
- Create: `lib/site.ts`
- Create: `components/mdx-content.tsx`
- Create: `components/post-list.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add site constants**

Export `SITE_NAME`, `SITE_DESCRIPTION`, and `SITE_URL` using `https://clipinsights.org`.

- [ ] **Step 2: Add the Velite MDX renderer**

Follow Velite's official runtime pattern: evaluate the compiled `content` string with `react/jsx-runtime` and render the returned component.

- [ ] **Step 3: Add reusable post list and pagination UI**

Render semantic article cards with title, excerpt, date, author link, tag links, and previous/next navigation.

- [ ] **Step 4: Update global metadata and neutral layout**

Set `metadataBase`, site title template, description, and a minimal header/main/footer structure. Keep the selected neutral Tailwind treatment without introducing design tokens.

### Task 3: Add blog and post routes

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Implement the paginated blog index**

Await `searchParams`, parse `page`, reject arrays/non-positive/non-integer/out-of-range values with `notFound()`, and render ten published posts per page.

- [ ] **Step 2: Implement the post route**

Generate params from published posts, reject drafts and unknown slugs, render post metadata and compiled MDX, and link author/tags.

- [ ] **Step 3: Implement metadata**

The blog index uses route metadata. The post page uses `seoTitle ?? title`, `seoDescription ?? excerpt`, and `canonicalUrl ?? permalink`.

### Task 4: Add author and tag routes

**Files:**
- Create: `app/blog/author/[slug]/page.tsx`
- Create: `app/blog/tag/[slug]/page.tsx`

- [ ] **Step 1: Implement author pages**

Generate all author slugs, resolve the author or call `notFound()`, filter published posts, and generate metadata from name/bio with a canonical URL.

- [ ] **Step 2: Implement tag pages**

Generate all tag slugs, resolve the tag or call `notFound()`, filter published posts, and generate metadata from name/description with a canonical URL.

### Task 5: Add discovery routes and verify

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Generate the sitemap**

Return home, blog, every published post, and unique referenced author/tag URLs. Use post update or publication dates for post `lastModified`.

- [ ] **Step 2: Generate robots output**

Allow all crawlers and link to `https://clipinsights.org/sitemap.xml`.

- [ ] **Step 3: Run full verification**

Run:

```bash
npx velite
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Expected: all commands exit successfully and the build lists blog, dynamic content, sitemap, and robots routes.

- [ ] **Step 4: Stop at the Phase 2 checkpoint**

Report implemented routes and verification evidence. Do not begin Phase 3 without user approval.
