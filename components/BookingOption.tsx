export function BookingOption({ selected, title, description, meta, onClick }: Readonly<{ selected: boolean; title: string; description?: string; meta?: string; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[999px] border p-4 text-left transition-all ${selected ? "border-black bg-transparent" : "border-black/70 bg-transparent hover:border-black"}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <span className="flex min-w-0 items-start gap-3 break-words">
          <span aria-hidden="true" className={`mt-1 h-3 w-3 shrink-0 rounded-full border border-ink/70 ${selected ? "bg-orange" : "bg-transparent"}`} />
          <span className="min-w-0">
            <strong className="block text-sm font-normal text-black">{title}</strong>
            {description && <span className="mt-1 block break-words text-xs leading-relaxed text-ink/55">{description}</span>}
          </span>
        </span>
        {meta && <span className="shrink-0 text-xs font-bold text-orange">{meta}</span>}
      </div>
    </button>
  );
}
