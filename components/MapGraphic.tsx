import Image from "next/image";
import denmarkMap from "@/app/onboarding/Skærmbillede_2026-09-21_203921-removebg-preview.png";

export function MapGraphic({ detail = false }: Readonly<{ detail?: boolean }>) {
  if (!detail) {
    return <Image src={denmarkMap} alt="Illustrated map of Denmark" className="h-full w-full object-contain" priority />;
  }

  return <svg viewBox="0 0 500 600" className="h-auto w-full" role="img" aria-label="Abstract bike tour route map">
    <path d="M110 10 C175 72 92 112 156 160 S280 180 235 256 C198 321 282 322 333 278 S417 245 392 350 C371 436 420 445 365 548" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".2" />
    <path className="route-draw" pathLength="1" d="M75 505 C110 456 64 420 132 384 S194 322 160 285 C130 255 184 226 217 235 C254 245 258 190 295 163 S371 126 352 77" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="75" cy="505" r="11" fill="var(--paper)" stroke="currentColor" strokeWidth="3" />
    <circle cx="352" cy="77" r="11" fill="var(--paper)" stroke="currentColor" strokeWidth="3" />
    <path d="M65 506h20M75 496v20M342 77h20M352 67v20" stroke="currentColor" strokeWidth="1" />
    <path d="M30 550 C150 470 90 372 235 350 S383 285 460 320M40 170 C140 200 136 108 230 125 S345 220 470 190" fill="none" stroke="currentColor" strokeWidth="1" opacity=".18" strokeDasharray="4 8" />
    <text x="91" y="536" fill="currentColor" fontSize="10" letterSpacing="2">START</text>
    <text x="365" y="61" fill="currentColor" fontSize="10" letterSpacing="2">END</text>
  </svg>;
}
