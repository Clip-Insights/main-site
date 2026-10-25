import Link from "next/link";
import { APP_URL, STORE_URL } from "@/lib/site";
import { BrandMark } from "./brand-mark";
export function SiteFooter() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link href="/" className="wordmark" aria-label="Clip Insights home"><BrandMark/></Link><p>A little less replaying.<br/>A lot more understanding.</p></div>
      <div className="footer-links"><div><h2>Product</h2><Link href="/features">Features</Link><a href={STORE_URL}>Chrome extension</a><a href={APP_URL}>Web app</a><Link href="/pricing">Plans & access</Link></div><div><h2>Learn</h2><Link href="/guides">Getting started</Link><Link href="/blog">Blog</Link><Link href="/guides/troubleshooting">Troubleshooting</Link><a href="/rss.xml">RSS feed</a></div><div><h2>Clip Insights</h2><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} Clip Insights</span><Link href="/contact">Contact the team</Link><span>Built for the curious.</span></div></div></footer>;
}
