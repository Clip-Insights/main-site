# Public website architecture

The Clip Insights public website is a Next.js App Router application with TypeScript, React 19, and Velite content collections. It provides product information, guides, articles, and contact and policy pages at [clipinsights.org](https://clipinsights.org).

![Public website architecture](./docs/diagrams/public-site-architecture.svg)

## Content flow

Velite reads the source content collections, validates their metadata, and produces typed data during development and production builds. Next.js pages use that data to render article listings, article pages, guides, and information pages. Public images, fonts, and the sample notes PDF are served from `public`.

## Application structure

| Location | Responsibility |
| --- | --- |
| `app` | Routes, page composition, metadata, and global layout. |
| `components` | Product sections, navigation, content views, and the illustrative product walkthrough. |
| `content` | Posts, guides, pages, authors, tags, and categories. |
| `lib` | Site configuration, content queries, metadata helpers, and redirect handling. |
| `public` | Images, self-hosted fonts, and sample PDF. |
| `redirects.json` | Route redirects and policy aliases. |

## Application boundaries

Public content renders independently of account and AI services. Product links send visitors to the Chrome extension and [web dashboard](https://app.clipinsights.org). Authentication, document storage, and AI processing belong to those clients and the shared backend.

`lib/site.ts` defines the canonical website URL, web-app URL, Chrome Web Store URL, and contact address. Page metadata and navigation derive their links from this configuration.

## Build and verification

Use Node.js 22.16 or later. `npm run dev` starts development, `npm run build` creates the production build, and `npm run preview` serves it on port 3001. Tests cover content queries, metadata helpers, and redirect handling. The link-checking script can check the running preview.

See [README.md](./README.md) for commands and [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting configuration.
