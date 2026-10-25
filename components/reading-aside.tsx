import Link from "next/link";
import { STORE_URL } from "@/lib/site";
export function ReadingAside() {
  return <aside className="reading-aside"><h2>Put it into practice.</h2><p>Keep your notes beside the video, then take them with you.</p><Link href="/guides/getting-started">Getting started →</Link><Link href="/guides/troubleshooting">Need a hand? →</Link><Link href="/features">Explore the study tools →</Link><a href={STORE_URL} className="button button-small">Add to Chrome</a></aside>;
}
