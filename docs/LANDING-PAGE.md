# Landing page design and assets

The homepage presents a sample YouTube study session through capture, understanding, PDF export, and the web library. It uses the current product interface rather than an illustrative replacement interface.

## Source

- `app/page.tsx` and `app/landing.module.css`: page composition, copy, and responsive layout.
- `components/product-visuals.*`: shared lesson, extension, capture, and PDF compositions.
- `components/product-demo.*`: selectable Capture / Understand / Keep walkthrough, also used on the Features page. Arrow keys, Home, and End move between tabs.
- `public/product/`: locally hosted product imagery.
- `public/sample-notes.pdf`: the actual two-page sample PDF shown on the page.

The extension screenshots are rendered from its current presentational components using authored example notes, summary, and chat content. They preserve the native 360 × 450 layout; the timeline is shown at a normal scrolled position. The gradient-descent lesson is original artwork. The player surround is a marketing composition.

The library image composes the web app's existing `FolderCard` and `FileCard` components with sample folders and files. It does not depict a live account or a full dashboard screenshot. The page labels it as a sample library. No private user information is included.

Both PDF page images come from the extension's actual exporter using the same example lesson. If the exporter or product interface changes, regenerate the relevant assets together so the page stays accurate.

## Development and review

Use `npm run dev -- --hostname 127.0.0.1 --port 3002` for local review. Run `npm run lint`, `npm test`, and `npm run build` before publishing. `npm run dev` and `npm run build` explicitly use Next.js's supported Webpack mode: Turbopack's CSS worker exits before connecting in this Windows workspace. No framework or dependency change is required.

The main content is server rendered. Only the mobile navigation and study walkthrough need client state. Below-the-fold images load lazily; the hero extension image is preloaded. The walkthrough has no API calls, account access, automatic playback, or simulated functional extension controls.

Local study material is cleared after five days. The FAQ explains downloading a PDF or uploading it to an account to keep a copy. Uploads are manual; the landing page does not promise automatic note synchronization. AI availability depends on sign-in, transcripts, connection, and account allowances.
