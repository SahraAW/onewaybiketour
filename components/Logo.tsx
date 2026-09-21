import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 104 46" className={className} role="img" aria-label="One way logo mark">
    <path d="M2 35h60c17 0 20-28 38-28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
    <circle cx="82" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="82" cy="20" r="4.5" fill="currentColor" />
  </svg>;
}

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`flex items-center gap-2 text-lg font-bold tracking-[-.07em] ${light ? "text-white" : ""}`} aria-label="One way bike tours home">
    <span>One way</span><LogoMark className="h-5 w-11 text-orange" />
  </Link>;
}
