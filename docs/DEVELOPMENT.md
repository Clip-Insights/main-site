# Local development

Setup, configuration, build, and verification instructions for the public website.

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

Deployment configuration is described in [DEPLOYMENT.md](../DEPLOYMENT.md). Content import utilities under `scripts/` are maintenance tools and are not part of the normal build or deployment process.

