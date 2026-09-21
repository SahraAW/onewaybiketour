import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 md:px-10">
    <Logo />
    <nav className="hidden items-center gap-7 text-[11px] font-bold lg:flex">
      <Link href="/tours" className="transition-colors hover:text-orange">Tours</Link>
      <Link href="/booking/bike" className="transition-colors hover:text-orange">Bike type</Link>
      <Link href="/login" className="transition-colors hover:text-orange">Log in</Link>
      <Link href="/register" className="rounded-full bg-orange px-5 py-2.5 text-white transition-transform hover:-translate-y-0.5">Register</Link>
    </nav>
    <Link href="/booking/bike" className="text-[11px] font-bold lg:hidden">Choose a bike <span className="orange-line">↗</span></Link>
  </header>;
}
