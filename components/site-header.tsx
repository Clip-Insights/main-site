"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { APP_URL, STORE_URL } from "@/lib/site";
import { Arrow } from "./icons";
const links = [{ href: "/#how-it-works", label: "How it works" }, { href: "/features", label: "Features" }, { href: "/guides", label: "Guides" }, { href: "/blog", label: "Blog" }];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
    <div className="container header-inner">
      <Link href="/" className="wordmark" aria-label="Clip Insights home" onClick={() => setOpen(false)}><Image src="/logo-light.svg" width={32} height={32} alt=""/><span>clip<span className="wordmark-light">insights</span><span className="brand-dot">.</span></span></Link>
      <button id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
        <a className="nav-app" href={APP_URL}>Open app <Arrow/></a><a className="button button-small" href={STORE_URL}>Add to Chrome</a>
      </nav>
    </div>
  </header>;
}
