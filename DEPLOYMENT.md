# Deploy Clip Insights public site

This repository is the public site. Keep the existing `clip-insights-fe` project on `app.clipinsights.org`; they are separate deployments. The public site does not require the Django backend or API secrets to build or render.

## Local checks

Use Node 22.16 or later with npm. Run `npm ci`, `npm test`, `npm run lint`, and `npm run build`. Start a production preview with `npm run preview`, then run `node scripts/check-links.mjs http://localhost:3001`.

Markdown articles and product guides are validated and compiled by Velite during Next.js development/build. Public information pages live in `content/pages`, guides in `content/guides` and articles in `content/posts`. All contain finished copy. Existing WordPress slugs, publication dates and migration redirects are retained.

## Vercel

1. Commit and push the reviewed local changes to `Clip-Insights/main-site`.
2. Create/import a separate Vercel project for that repository. Select the Next.js framework preset and the repository root (`./`). Use `npm run build`; let Vercel detect the output directory. Use Node 22.x.
3. No environment variables are required for this site. Do not copy backend keys, Google client secrets, database credentials or extension tokens into it.
4. Verify the Vercel deployment URL, including guides, articles, contact, privacy, PDF download and an unknown path.
5. Add `clipinsights.org` to this new project's Domains settings. Add `www.clipinsights.org` and configure it to redirect to `https://clipinsights.org`.
6. At Namecheap Advanced DNS, remove only the conflicting parking/URL-redirect records for `@` and `www`. Enter the exact apex and `www` DNS records displayed by this new Vercel project. Do not substitute remembered IPs or another project's target.
7. Keep the existing `app` CNAME and nameservers. Wait for Vercel to validate both public-site names and issue HTTPS certificates. Test both HTTP-to-HTTPS and `www`-to-apex behavior after validation.

The canonical base URL is already `https://clipinsights.org`. The source has the confirmed support address `zubayrahmad0308@gmail.com`. `/privacy-policy` redirects to `/privacy`, and `/terms-and-conditions` redirects to `/terms` for common legacy links.

## Store and identity links

Set the Chrome Web Store website to `https://clipinsights.org`, support URL to `https://clipinsights.org/contact` and privacy URL to `https://clipinsights.org/privacy`. Update public Google OAuth branding homepage/privacy/terms links where they still use the old domain. This does not change the correctly configured application origin or extension OAuth redirects.

The Chrome Store installation link uses the existing production extension ID. The homepage's interactive walkthrough contains original illustrative lesson content, explicitly labelled as a demonstration, and does not submit a live AI request. The downloadable sample is generated with the extension's PDF renderer from original sample content.

## Backend-independent launch versus product availability

The public pages, articles, guides, contact link and sample download can work while Cloud Run is unavailable. Backend billing restoration and an authenticated extension test remain necessary to verify live Google sign-in exchange, AI responses and PDF uploads. Publishing this website does not restore those services.

Privacy text describes the code's supported service providers and manual request path without claiming a fixed deletion schedule or provider training policy. Review it whenever the actual deployed providers, retention handling, payment processing or analytics change. The public site adds no advertising or analytics SDK.

Old `.com` traffic reaches a Vercel redirect only if the old domain's DNS points to Vercel. The preserved WordPress path redirects work on this deployed site; they cannot repair a domain outside your control.
