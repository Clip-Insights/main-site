import Link from "next/link";
import { Arrow } from "./icons";

type ReadingLink = { href: string; title: string; excerpt: string };

export function RelatedReading({ items }: { items: ReadingLink[] }) {
  return <nav className="related-links" aria-label="Related reading">
    {items.map(item => <Link key={item.href} href={item.href}>
      <span><strong>{item.title}</strong><span className="related-excerpt">{item.excerpt}</span></span>
      <span className="related-arrow"><Arrow/></span>
    </Link>)}
  </nav>;
}
