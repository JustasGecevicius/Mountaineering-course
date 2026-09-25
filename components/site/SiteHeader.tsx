"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [{ href: "/", label: "Home" }, { href: "/knots", label: "Knots" }, { href: "/techniques", label: "Techniques" }];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/s$/, ""));
  return <header className="site-header">
    <Link className="brand" href="/" onClick={() => setOpen(false)}><span className="brand-mark"><img src="/alpine/mountain.svg" alt="" /></span><span>Alpine Craft</span></Link>
    <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href} className={active(link.href) ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
    <div className="webinar">Webinar: Snow Anchors Live <span /></div>
    <button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
  </header>;
}
