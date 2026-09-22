"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { useBooking } from "@/components/BookingProvider";
import type { BikePreferences } from "@/lib/booking";
import { useRouter } from "next/navigation";

const questions: Array<{ key: keyof BikePreferences; title: string; options: string[] }> = [
  { key: "experience", title: "What kind of bike rides are you used to?", options: ["City rides", "Mountain rides", "Track rides"] },
  { key: "priority", title: "What would you most like from your bike?", options: ["Comfort and an upright riding position", "Speed and efficiency", "Extra assistance when cycling", "Budget friendly"] },
  { key: "luggage", title: "Will you be carrying luggage during your ride?", options: ["No luggage", "A small backpack", "Some luggage on the bike", "A lot of luggage"] },
  { key: "electric", title: "How important is electric assistance to you?", options: ["Very important", "Nice to have", "Not necessary"] },
  { key: "height", title: "What is your height?", options: ["Under 160 cm", "160–170 cm", "171–180 cm", "181–190 cm"] }
];

export default function BookingQuestionsPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<BikePreferences>>(booking.bikePreferences ?? {});
  const [showError, setShowError] = useState(false);
  const question = questions[step];
  const answer = answers[question.key];
  const choose = (value: string) => { setAnswers((current) => ({ ...current, [question.key]: value })); setShowError(false); };
  const continueQuestion = () => {
    if (!answer) { setShowError(true); return; }
    if (step === questions.length - 1) {
      updateBooking({ bikePreferences: answers as BikePreferences });
      router.push("/bike-recommendations");
      return;
    }
    setStep((current) => current + 1);
  };
  return <BookingLayout step="bike">
    <div className="booking-question-screen mx-auto w-full max-w-2xl">
      <p className="eyebrow text-orange">Bike fit / Question {step + 1} of {questions.length}</p>
      <h1 className="mt-5 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">{question.title}</h1>
      <div className="mt-8 grid gap-3">{question.options.map((option) => <BookingOption key={option} title={option} selected={answer === option} onClick={() => choose(option)} />)}</div>
      {showError && <p role="alert" className="mt-4 text-sm font-bold text-orange">Please choose an answer before continuing.</p>}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={() => step === 0 ? router.push("/booking/date") : setStep((current) => current - 1)} className="min-h-11 text-sm font-bold text-orange">‹&nbsp; Back</button>
        <button type="button" onClick={continueQuestion} className="min-h-11 rounded-full bg-orange px-7 py-3 text-sm font-bold text-white">{step === questions.length - 1 ? "See my bikes ↗" : "Continue"}</button>
      </div>
      <Link href="/booking/date" className="mt-8 inline-block text-xs font-bold text-ink/50">Change date</Link>
    </div>
  </BookingLayout>;
}