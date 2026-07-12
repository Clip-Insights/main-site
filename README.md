# ClipInsights: WP → Next.js/Velite migration scaffold

## 1. Install deps

```bash
npm i velite -D
npm i -D turndown turndown-plugin-gfm slugify gray-matter
```

(Node 18+ has global `fetch`, so no extra fetch package needed.)

## 2. Run the migration script

```bash
WP_BASE_URL=https://clipinsights.com node scripts/migrate-wp-to-mdx.mjs
```

This writes:
- `content/posts/<slug>.mdx` — one file per post, frontmatter + body
- `content/authors/<slug>.md`
- `content/tags/<slug>.md`
- `content/categories/<slug>.md` (reference only — not wired into the schema; fold into `tags` or add a `categories` collection in `velite.config.ts` if you want them kept separate)
- `redirects.json` at the project root — old WP URL → new `/blog/<slug>` mapping, feed this into `next.config.js` `redirects()` or `vercel.json`

`next.config.ts` loads `redirects.json` during Next.js configuration. Re-run the
migration before `npm run build`; if `npm run dev` is already running, restart it
after regenerating the redirect map.

## 3. Manual review pass (expect to spend real time here)

The script handles standard post content well, but flag these for manual cleanup:
- WP shortcodes (`[gallery]`, `[embed]`, custom plugin shortcodes) — Turndown won't understand them, they'll show up as literal text
- Custom Gutenberg blocks (testimonials, pricing tables, etc.) — same issue
- ACF/custom fields — not pulled by this script; extend `wpFetch('posts?_embed')` handling to read `post.acf` if ACF-to-REST is enabled, and add matching fields to the Velite schema
- Confirm your actual WP permalink structure (Settings → Permalinks) before cutover. The script preserves each post's same-site canonical `link` path in `redirects.json`.

## 4. Wire up Velite

`velite.config.ts` is at the project root. Run `npx velite` (or `npx velite dev` while developing) to validate content and generate types, then import from `.velite` in your Next.js pages, e.g.:

```ts
import { posts } from '#site/content'; // path alias to .velite output, per Velite's Next.js setup guide
```

## 5. Before cutover

- Diff post count / dates against the live WP site to make sure nothing was skipped (script handles pagination, but sanity-check numbers)
- Test `redirects.json` entries against Google Search Console's indexed URL list, not just what's currently on the site
- Re-run the script right before cutover to catch any last-minute WP edits
