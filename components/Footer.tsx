import Image from "next/image";
import Link from "next/link";
import wordmark from "@/app/onboarding/Skærmbillede_2026-09-21_214524-removebg-preview.png";

export function Footer() {
  const headingClass = "mb-2 text-sm font-semibold uppercase";
  const linkClass = "transition-colors hover:text-orange";
  const socialClass = "inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-orange";

  return <footer className="relative bg-paper px-5 pb-8 pt-12 text-black before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-[#aaa6a5] before:content-[''] md:px-10 md:pb-10 md:pt-14">
    <div className="mx-auto grid max-w-7xl items-center gap-6 text-xs leading-relaxed md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_auto_1fr]">
      <div className="min-w-0">
        <section className="mb-5">
          <h2 className={headingClass}>Want to join the adventure?</h2>
          <a href="mailto:info@onewaybiketours.com?subject=Become%20a%20Partner" className={linkClass}>Become a partner</a>
        </section>
        <section className="mb-5">
          <h2 className={headingClass}>Contact</h2>
          <div className="flex flex-col items-start gap-1">
            <a href="tel:+4521747589" aria-label="Telephone: +45 21 74 75 89" className={linkClass}>Telephone</a>
            <a href="mailto:info@onewaybiketours.com" aria-label="Email: info@onewaybiketours.com" className={linkClass}>Email</a>
          </div>
        </section>
        <section>
          <h2 className={headingClass}>Location</h2>
          <address className="not-italic">Café Parforce, Dyrehavevej 1<br />2930 Klampenborg, Denmark</address>
        </section>
        <nav aria-label="Social media" className="-ml-3 mt-3 flex items-center gap-1">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className={socialClass}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M14 22v-9h3l.5-4H14V7c0-1 .5-2 2-2h2" /></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className={socialClass}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={socialClass}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M7 10v8m4 0v-8m0 4a3 3 0 0 1 6 0v4" /><circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
        </nav>
      </div>
      <Link href="/" aria-label="One way bike tours home" className="block w-[clamp(160px,45vw,300px)] max-w-full justify-self-center text-orange md:col-start-2">
        <Image src={wordmark} alt="One way" className="h-auto w-full" />
        <span className="mt-1 block text-center text-[clamp(1.7rem,7.65vw,3.2rem)] font-bold leading-none tracking-tight">bike tours</span>
      </Link>
    </div>
  </footer>;
}
