import Link from "next/link";

const steps = [
  { id: "date", label: "Date", href: "/booking/date" },
  { id: "bike", label: "Bike", href: "/booking/bike" },
  { id: "insurance", label: "Insurance", href: "/booking/extras" },
  { id: "summary", label: "Summary", href: "/booking/summary" }
];

export function BookingProgress({ activeStep }: { activeStep: string }) {
  const activeIndex = steps.findIndex((step) => step.id === activeStep);
  return <nav aria-label="Booking progress" className="booking-progress">{steps.map((step, index) => { const complete = index < activeIndex; const current = index === activeIndex; const content = <><span className="booking-progress-number">{index + 1}</span><span>{step.label}</span></>; return complete ? <Link key={step.id} href={step.href} className="booking-progress-step booking-progress-complete">{content}</Link> : <span key={step.id} aria-current={current ? "step" : undefined} className={`booking-progress-step ${current ? "booking-progress-current" : "booking-progress-upcoming"}`}>{content}</span>; })}</nav>;
}
