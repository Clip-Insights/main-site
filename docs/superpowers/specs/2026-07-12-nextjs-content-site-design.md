# Next.js Content Site Design

## Scope

Bootstrap Phase 1 of the Clip Insights marketing/blog site in `main-site`. Later phases are intentionally excluded until the user reviews the Phase 1 result.

## Project initialization

- Generate a current Next.js App Router project with create-next-app in a temporary sibling directory, then copy the scaffold into the existing non-empty `main-site` directory.
- Use TypeScript, Tailwind CSS, ESLint, npm, and a root-level `app/` directory.
- Preserve `README.md` and `velite.config.ts`.
- Move `migrate-wp-to-mdx.mjs` to `scripts/migrate-wp-to-mdx.mjs`.
- Do not select or customize a Tailwind design system in this phase.

## Velite integration

- Install `velite`, `turndown`, `turndown-plugin-gfm`, `slugify`, and `gray-matter` as development dependencies.
- Use Velite's current Next.js configuration integration in `next.config.ts`: start a Velite build for `next dev` and `next build`, with watch mode only during development.
- Map `#site/content` to `./.velite` in `tsconfig.json`.
- Keep the supplied schema and its output locations unchanged.

## Placeholder content

- Create `content/posts`, `content/authors`, and `content/tags`.
- Add minimal placeholder records that satisfy the supplied schema and reference one another correctly.
- Use only generic scaffold content; no invented WordPress content.

## Verification

- Run `npx velite` and confirm generated data and types are produced.
- Run ESLint and a production Next.js build to catch integration errors.
- Show the resulting Phase 1 file tree and verification results, then stop for approval before Phase 2.

## Deferred decisions

- Tailwind design-system choices.
- Separate categories collection versus folding categories into tags.
- Exact Giscus repository, category, and IDs.
