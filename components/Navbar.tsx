"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [open]);
  const closeMenu = () => { setOpen(false); setQuery(""); };
  const menuItems = [{ label: "HOME", href: "/" }, { label: "BIKES", href: "/booking/bike" }, { label: "ROUTES", href: "/tours" }, { label: "CONTACT", href: "mailto:hello@oneway.tours" }];
  const filteredItems = menuItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 md:px-10">
    <Logo />
    <nav className="hidden items-center gap-7 text-[11px] font-bold lg:flex">
      <Link href="/tours" className="transition-colors hover:text-orange">Tours</Link>
      <Link href="/booking/bike" className="transition-colors hover:text-orange">Bike type</Link>
      <Link href="/login" className="transition-colors hover:text-orange">Log in</Link>
      <Link href="/register" className="rounded-full bg-orange px-5 py-2.5 text-white transition-transform hover:-translate-y-0.5">Register</Link>
    </nav>
    <div className="flex items-center gap-3 lg:hidden">
      <Link href="/tours" className="rounded-full bg-orange px-4 py-2 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5">Explore tour <span className="ml-1">↗</span></Link>
      <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" className="min-h-11 rounded-full border border-ink/25 px-4 text-[11px] font-bold">Menu</button>
    </div>
    {open && <><button type="button" aria-label="Close menu overlay" onClick={closeMenu} className="fixed inset-0 z-40 cursor-default bg-ink/20" /><dialog open id="mobile-menu" aria-label="Mobile navigation" className="fixed inset-y-0 right-0 z-50 m-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto bg-paper p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><Logo /><button type="button" onClick={closeMenu} className="min-h-11 min-w-11 rounded-full border border-ink/25 text-xl" aria-label="Close menu">×</button></div><label className="mt-10 block text-xs font-bold" htmlFor="mobile-menu-search">Search<input id="mobile-menu-search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 min-h-11 w-full rounded-full border border-ink/20 bg-transparent px-4 text-sm outline-none focus:border-orange" placeholder="Search" /></label><nav className="mt-10 grid gap-1 border-b border-ink/15 pb-8">{filteredItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenu} className="min-h-12 py-3 text-2xl font-bold tracking-[-.04em] hover:text-orange">{item.label}</Link>)}{!filteredItems.length && <p className="py-3 text-sm text-ink/55">No pages found.</p>}</nav><div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-ink/60"><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div><div className="mt-auto grid gap-3 border-t border-ink/15 pt-8"><Link href="/register" onClick={closeMenu} className="min-h-12 rounded-full bg-orange px-5 py-3 text-center text-sm font-bold text-white">Register</Link><Link href="/login" onClick={closeMenu} className="min-h-12 rounded-full border border-ink/25 px-5 py-3 text-center text-sm font-bold">Log in</Link></div></dialog></>}
  </header>;
}
