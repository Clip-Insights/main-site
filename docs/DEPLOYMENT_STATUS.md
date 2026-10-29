# Production deployment — 25 October 2026

- Project: `zubayr-ahmads-projects/clip-insights-main-site`
- Project ID: `prj_EluXZfdq4C30qPF7PdSp4WLy6fvF`
- Deployment: `dpl_9r2VBn1jiQexE8UyEq7vHxC2PeK9`
- Source commit: `627a8614bc7826994d12218e47effef7b8b747c9` (main), present on GitHub.
- Framework: Next.js 16.4.3; configured Node 22.x.
- State: READY, production; remote install and Turbopack build passed, 36 routes generated.
- Public deployment: https://clip-insights-main-site.vercel.app
- Immutable deployment: https://clip-insights-main-site-lizquig5r-zubayr-ahmads-projects.vercel.app
- Intended canonical domain: https://clipinsights.org
- www.clipinsights.org attached with a 308 redirect to clipinsights.org.

## Domain setup — completed

Namecheap remains the authoritative DNS provider. The user saved the required records in Namecheap. Both Vercel domain-verification checks now report configured-correctly; authoritative DNS returns the expected apex A records and www CNAME. The user has been given these exact records from Vercel's domain configuration API:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | df46505a56e4b8f1.vercel-dns-017.com |

Use automatic TTL. Replace only conflicting apex/www parking or redirect records. Existing app CNAME and nameservers remain unchanged. Custom-domain HTTPS launch confirmed. Vercel issued the certificate for clipinsights.org and www.clipinsights.org. Trusted TLS requests return 200 for the root site; www and plain HTTP return 308 redirects to https://clipinsights.org/. Browser checks confirmed the homepage and Contact page on the main domain. The app CNAME remains unchanged.

## Verification

Home, Contact, Features, Blog and Privacy returned HTTP 200 on the public Vercel hostname. The full live-site crawler passed 36 URLs, metadata, anchors, expected 404 and seven legacy redirects. The error-level deployment log query returned no logs. No additional monitoring service was installed.

## Git integration

The CLI production deployment succeeded from the local checkout. Automatic GitHub repository connection was attempted but Vercel could not access `Clip-Insights/main-site`. Grant the Vercel GitHub integration access to that organization/repository to enable automatic redeploys; manual CLI deploys work with the confirmed project link.
