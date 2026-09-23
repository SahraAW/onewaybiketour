export function SkipQuestion({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center gap-3 text-base font-normal text-black transition-colors hover:text-orange focus-visible:text-orange" aria-label="Skip remaining questions">
    Skip
    <svg viewBox="0 0 16 24" className="h-5 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m4 4 8 8-8 8" /></svg>
  </button>;
}
