# Clip Insights · Public website

The public website for [Clip Insights](https://clipinsights.org): a place to discover the video study tools, read product guides, and explore articles about learning from video.

[Website](https://clipinsights.org) · [Web app](https://app.clipinsights.org) · [Project overview](https://github.com/Clip-Insights) · [System architecture](https://github.com/Clip-Insights/.github/blob/main/docs/ARCHITECTURE.md)

## Built with

Next.js App Router, TypeScript, and Velite for typed content. Product pages, guides, and articles are rendered from the application and its content files. Fonts are self-hosted; the Inter license is included.

## Run locally

Use Node.js 22.16 or later and npm.

```bash
git clone https://github.com/Clip-Insights/main-site.git
cd main-site
npm ci
npm run dev
```

The public site requires no backend environment variables, database, or API keys. Account and AI features are accessed through the separate web app and extension.

## Content and code

| Location | Purpose |
| --- | --- |
| `app/page.tsx` | Product homepage. |
| `components/product-demo.tsx` | Illustrative interactive product walkthrough. |
| `content/posts` | Articles about video learning and study workflows. |
| `content/guides` | Product guides. |
| `content/pages` | About, contact, plans, privacy, and terms. |
| `public/sample-notes.pdf` | Sample study notes generated with the extension's PDF renderer. |
| `lib/site.ts` | Website, app, store, and contact configuration. |
| `redirects.json` | Route redirects and policy aliases. |

Velite builds typed content during `next dev` and `next build`.

## Verify

```bash
npm test
npm run lint
npm run build
npm run preview
```

With the preview running, check internal links in another terminal:

```bash
node scripts/check-links.mjs http://localhost:3001
```

Deployment configuration is described in [DEPLOYMENT.md](./DEPLOYMENT.md). Content import utilities under `scripts/` are maintenance tools and are not part of the normal build or deployment process.

## Related repositories

- [chrome-extension](https://github.com/Clip-Insights/chrome-extension): the video study workspace.
- [web-app](https://github.com/Clip-Insights/web-app): accounts and saved document management.
- [backend](https://github.com/Clip-Insights/backend): the shared API and AI services.
