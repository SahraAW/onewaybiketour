import { Logo } from "./Logo";
export function Footer() {
  return <footer className="border-t border-ink/15 px-5 py-8 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><Logo /><p className="text-xs text-ink/55">Ride somewhere worth remembering. © 2025</p><div className="flex gap-5 text-xs text-ink/60"><a href="mailto:hello@oneway.tours">Contact</a><span>Instagram</span></div></div></footer>;
}
