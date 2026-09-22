"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { useBooking } from "@/components/BookingProvider";
import { getCalendarMonth } from "@/lib/booking";

export default function BookingDatePage() {
  const { booking, updateBooking } = useBooking();
  const today = new Date();
  const monthDates = useMemo(() => getCalendarMonth(today.getFullYear(), today.getMonth()), [today]);
  const [selected, setSelected] = useState<string | null>(booking.date);
  const [showError, setShowError] = useState(false);
  const firstWeekday = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthLabel = today.toLocaleDateString("en-US", { month: "long" });
  const selectedDate = monthDates.find((item) => item.date === selected);
  const chooseDate = (date: string, available: boolean) => {
    if (!available) return;
    setSelected(date);
    setShowError(false);
  };
  return (
    <BookingLayout step="date">
      <div className="calendar-screen">
        <div className="calendar-month">
          <h1 className="text-3xl font-medium capitalize">{monthLabel}</h1>
          <div className="calendar-grid mt-5" aria-label={`${monthLabel} availability calendar`}>
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`} className="calendar-weekday">{day}</span>)}
            {Array.from({ length: firstWeekday }, (_, index) => <span key={`empty-${index}`} />)}
            {monthDates.map((item) => {
              const date = new Date(`${item.date}T12:00:00`);
              const isSelected = selected === item.date;
              const dayLabel = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
              const availabilityLabel = item.available ? `, ${item.priceTier} price` : ", unavailable";
              return (
                <button
                  key={item.date}
                  type="button"
                  disabled={!item.available}
                  onClick={() => chooseDate(item.date, item.available)}
                  className={`calendar-day calendar-day-${item.priceTier} ${isSelected ? "calendar-day-selected" : ""} ${!item.available ? "calendar-day-disabled" : ""}`}
                  aria-label={`${dayLabel}${availabilityLabel}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          <div className="calendar-legend mt-7">
            <span><i className="calendar-dot calendar-dot-premium" />Higher price</span>
            <span><i className="calendar-dot calendar-dot-value" />Lower price</span>
            <span><i className="calendar-dot calendar-dot-standard" />Standard</span>
          </div>
          {selectedDate ? (
            <p className="mt-5 text-xs text-ink/55">
              Selected: <strong className="text-ink">{new Date(`${selectedDate.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</strong>
            </p>
          ) : (
            <p className="mt-5 text-xs text-ink/45">Choose an available date to continue.</p>
          )}
          {showError && <p role="alert" className="mt-2 text-xs font-bold text-orange">Please select a date before continuing.</p>}
        </div>
        <div className="mt-12 flex items-center justify-between">
          <Link href="/tours" className="text-base font-medium text-orange">‹&nbsp; back</Link>
          <Link
            href="/booking/questions"
            onClick={(event) => { if (!selected) { event.preventDefault(); setShowError(true); } else updateBooking({ date: selected }); }}
            className={`rounded-full px-9 py-4 text-base font-medium text-white transition-opacity ${selected ? "bg-orange" : "bg-orange/50"}`}
          >
            Continue
          </Link>
        </div>
      </div>
    </BookingLayout>
  );
}

