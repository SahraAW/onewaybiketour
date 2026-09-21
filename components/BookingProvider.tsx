"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { initialBooking, type BookingState } from "@/lib/booking";

type BookingContextValue = {
  booking: BookingState;
  updateBooking: (patch: Partial<BookingState>) => void;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);
const storageKey = "one-way-bike-tours-booking";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialBooking);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setBooking({ ...initialBooking, ...JSON.parse(saved) });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(booking));
  }, [booking]);

  const updateBooking = useCallback((patch: Partial<BookingState>) => setBooking((current) => ({ ...current, ...patch })), []);
  const resetBooking = useCallback(() => setBooking(initialBooking), []);

  return <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}
