"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { FaqDialog } from "./FaqDialog";

export function Navbar() {
  const [openMode, setOpenMode] = useState<"closed" | "preview" | "pinned">("closed");
  const open = openMode !== "closed";
  const pinned = openMode === "pinned";
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!pinned) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenMode("closed"); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [pinned]);
  const closeMenu = () => { setOpenMode("closed"); setQuery(""); };
  const menuItems = [{ label: "HOME", href: "/" }, { label: "BIKES", href: "/booking/bike" }, { label: "ROUTES", href: "/tours" }, { label: "CONTACT", href: "mailto:hello@oneway.tours" }];
  const filteredItems = menuItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-6 sm:px-5 md:px-10">
    <Logo fullName />
    <div className="ml-auto flex shrink-0 items-center justify-end gap-1 whitespace-nowrap sm:gap-2">
      <Link href="/onboarding" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--orange)] px-2 py-2.5 text-[10px] sm:min-h-12 sm:px-4 sm:text-xs font-semibold text-white transition-colors hover:bg-[#d94f00]">Find your match <span aria-hidden="true">↗</span></Link>
      <button type="button" onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpenMode((current) => current === "pinned" ? current : "preview"); }} onPointerLeave={() => setOpenMode((current) => current === "preview" ? "closed" : current)} onClick={() => setOpenMode("pinned")} aria-expanded={open} aria-controls="mobile-menu" className="inline-flex h-11 items-center justify-center rounded-full border border-black px-3 text-[11px] font-bold sm:h-12 sm:px-4 sm:text-xs">Menu</button>
      <FaqDialog />
    </div>
    {open && <><button type="button" aria-label="Close menu overlay" onClick={closeMenu} tabIndex={-1} className={`fixed inset-0 z-40 cursor-default bg-black/10 ${!pinned ? "pointer-events-none" : ""}`} /><dialog open ref={(node) => { if (node) node.inert = !pinned; }} aria-hidden={!pinned} id="mobile-menu" aria-label="Mobile navigation" className={`fixed inset-y-0 right-0 z-50 m-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto whitespace-normal bg-paper p-6 sm:p-8 ${!pinned ? "pointer-events-none" : ""}`}><div className="flex items-center justify-between"><Logo /><button type="button" onClick={closeMenu} className="min-h-11 min-w-11 rounded-full border border-black text-xl" aria-label="Close menu">×</button></div><label className="mt-10 block text-xs font-bold" htmlFor="mobile-menu-search">Search<input id="mobile-menu-search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 min-h-11 w-full rounded-full border border-black bg-transparent px-4 text-sm outline-none focus:border-orange" placeholder="Search" /></label><nav className="mt-10 grid gap-1 border-b border-black/15 pb-8">{filteredItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenu} className="min-h-12 py-3 text-2xl font-bold tracking-[-.04em] hover:text-orange">{item.label}</Link>)}{!filteredItems.length && <p className="py-3 text-sm text-ink/55">No pages found.</p>}</nav><div className="mt-8 flex flex-col items-start gap-3 text-xs text-ink/60"><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div><div className="mt-auto grid gap-3 border-t border-black/15 pt-8"><Link href="/register" onClick={closeMenu} className="min-h-12 rounded-full bg-orange px-5 py-3 text-center text-sm font-bold text-white">Register</Link><Link href="/login" onClick={closeMenu} className="min-h-12 rounded-full border border-black px-5 py-3 text-center text-sm font-bold">Log in</Link></div></dialog></>}
  </header>;
}
