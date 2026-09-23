import Link from "next/link";
import Image from "next/image";
import mobileLogo from "@/app/onboarding/Skærmbillede_2026-09-21_100841-removebg-preview.png";
import desktopLogo from "@/app/onboarding/Skærmbillede_2026-09-21_214524-removebg-preview.png";

export function LogoMark({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 104 46" className={className} role="img" aria-label="One way logo mark">
    <path d="M2 35h60c17 0 20-28 38-28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
    <circle cx="82" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="82" cy="20" r="4.5" fill="currentColor" />
  </svg>;
}

export function Logo({ light = false, fullName = false }: Readonly<{ light?: boolean; fullName?: boolean }>) {
  if (fullName) return <Link href="/" className={`flex min-h-11 w-12 max-w-full shrink-0 items-center sm:w-[230px] lg:w-[300px] ${light ? "text-white" : "text-orange"}`} aria-label="One way bike tours home">
    <svg viewBox="446 28 102 48" className="h-auto w-full sm:hidden" aria-hidden="true">
      <path d="M450 68H524" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="524" cy="51" r="17" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="524" cy="51" r="3.5" fill="currentColor" />
    </svg>
    <svg viewBox="0 0 550 100" className="hidden h-auto w-full sm:block" aria-hidden="true">
      <text x="8" y="59" fill="currentColor" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="700" textLength="478" lengthAdjust="spacingAndGlyphs">ONE WAY BIKE TOURS</text>
      <path d="M450 68H524" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="524" cy="51" r="17" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="524" cy="51" r="3.5" fill="currentColor" />
    </svg>
  </Link>;
  return <Link href="/" className={light ? "brightness-0 invert" : ""} aria-label="One way bike tours home">
    <Image src={mobileLogo} alt="One way" className="h-8 w-auto lg:hidden" priority />
    <Image src={desktopLogo} alt="One way" className="hidden h-8 w-auto lg:block" priority />
  </Link>;
}
