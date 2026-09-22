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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [open]);

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label="Open frequently asked questions" aria-expanded={open} className="min-h-11 min-w-11 rounded-full border border-ink/30 text-sm font-bold transition-colors hover:border-orange hover:text-orange">?</button>
    {open && <>
      <button type="button" aria-label="Close frequently asked questions overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default bg-ink/25" />
      <dialog open aria-label="Frequently asked questions" className="fixed inset-0 z-50 m-auto flex max-h-[min(88vh,760px)] w-[min(92vw,680px)] flex-col overflow-hidden rounded-[1.5rem] border border-ink/15 bg-paper p-0 text-ink shadow-2xl">
        <div className="flex items-start justify-between gap-5 border-b border-ink/15 p-5 sm:p-7">
          <div><p className="eyebrow text-orange">Need a hand?</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">Frequently asked questions</h2></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close frequently asked questions" className="min-h-11 min-w-11 shrink-0 rounded-full border border-ink/25 text-xl">×</button>
        </div>
        <div className="overflow-y-auto px-5 sm:px-7">
          {faqItems.map((item) => <details key={item.question} className="border-b border-ink/20 py-4"><summary className="cursor-pointer list-none pr-8 text-sm font-semibold leading-relaxed marker:hidden">{item.question}<span aria-hidden="true" className="float-right text-orange">+</span></summary><p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/65">{item.answer}</p></details>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7"><p className="text-sm text-ink/60">Need more help?</p><a href="mailto:hello@oneway.tours" className="font-bold text-orange">more info ↗</a></div>
      </dialog>
    </>}
  </>;
}
