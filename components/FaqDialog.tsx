"use client";

import { useEffect, useState } from "react";

const faqItems = [
  {
    question: "What if my bike get stolen?",
    answer: "Contact us as soon as possible and report the theft to the local police. Our support team will guide you through the next steps and the cover included with your booking."
  },
  {
    question: "What should I do if I get a mechanical issue?",
    answer: "Stop somewhere safe and contact our support team. We will help troubleshoot the issue and arrange practical assistance when needed."
  },
  {
    question: "What type of payment methods do we accept?",
    answer: "You can complete your booking with Apple Pay or the payment method shown at checkout."
  },
  {
    question: "What is not included in the price?",
    answer: "Personal travel costs, meals and optional extras are not included unless they are listed in your booking summary."
  }
];

export function FaqDialog() {
  const [openMode, setOpenMode] = useState<"closed" | "preview" | "pinned">("closed");
  const open = openMode !== "closed";
  const pinned = openMode === "pinned";

  useEffect(() => {
    if (!pinned) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenMode("closed"); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [pinned]);

  return <>
    <button type="button" onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpenMode((current) => current === "pinned" ? current : "preview"); }} onPointerLeave={() => setOpenMode((current) => current === "preview" ? "closed" : current)} onClick={() => setOpenMode("pinned")} aria-label="Open frequently asked questions" aria-expanded={open} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black text-[11px] font-bold text-black transition-colors hover:text-orange focus-visible:text-orange sm:h-12 sm:w-12 sm:text-xs">FAQ</button>
    {open && <>
      <button type="button" aria-label="Close frequently asked questions overlay" onClick={() => setOpenMode("closed")} tabIndex={-1} className={`fixed inset-0 z-40 cursor-default bg-ink/25 ${!pinned ? "pointer-events-none" : ""}`} />
      <dialog open ref={(node) => { if (node) node.inert = !pinned; }} aria-hidden={!pinned} aria-label="Frequently asked questions" className={`fixed inset-0 z-50 m-auto flex max-h-[min(90dvh,760px)] w-[min(calc(100vw-24px),680px)] min-w-0 flex-col whitespace-normal overflow-hidden rounded-[1.5rem] border border-ink/15 bg-paper p-0 text-ink shadow-2xl ${!pinned ? "pointer-events-none" : ""}`}>
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-ink/15 p-4 sm:p-7">
          <div className="min-w-0"><p className="eyebrow text-orange">Need a hand?</p><h2 className="mt-2 break-words text-xl font-bold leading-tight sm:text-3xl">Frequently asked questions</h2></div>
          <button type="button" onClick={() => setOpenMode("closed")} aria-label="Close frequently asked questions" className="min-h-11 min-w-11 shrink-0 rounded-full border border-ink/25 text-xl">×</button>
        </div>
        <div className="min-h-0 min-w-0 overflow-y-auto overscroll-contain px-4 sm:px-7">
          {faqItems.map((item) => <details key={item.question} className="border-b border-ink/20 py-4"><summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold leading-relaxed marker:hidden [&::-webkit-details-marker]:hidden"><span className="min-w-0 break-words">{item.question}</span><span aria-hidden="true" className="shrink-0 text-orange">+</span></summary><p className="mt-3 max-w-xl break-words text-sm leading-relaxed text-ink/65">{item.answer}</p></details>)}
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 p-4 sm:p-7"><p className="text-sm text-ink/60">Need more help?</p><a href="mailto:hello@oneway.tours" className="font-bold text-orange">more info ↗</a></div>
      </dialog>
    </>}
  </>;
}
