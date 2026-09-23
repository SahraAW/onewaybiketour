"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingLayout } from "@/components/BookingLayout";
import { SkipQuestion } from "@/components/SkipQuestion";
import { BookingOption } from "@/components/BookingOption";
import { useBooking } from "@/components/BookingProvider";
import type { BikePreferences } from "@/lib/booking";
import { useRouter } from "next/navigation";

const questions: Array<{ key: keyof BikePreferences; title: string; options: string[] }> = [
  { key: "tourDuration", title: "How long is your planned bike tour?", options: ["A few hours", "One day", "2–3 days", "4 days or longer", "Add Your Own Response"] },
  { key: "bikeExperience", title: "What kind of bike rides are you used to?", options: ["City rides", "Mountain rides", "Track rides"] },
  { key: "bikePreference", title: "What would you most like from your bike?", options: ["Comfort and an upright riding position", "Speed and efficiency", "Extra assistance when cycling", "Budget friendly"] },
  { key: "electricAssistance", title: "How important is electric assistance to you?", options: ["Very important", "Nice to have", "Not necessary"] },
  { key: "height", title: "What is your height?", options: ["Under 160 cm", "160–170 cm", "171–180 cm", "181–190 cm"] }
];

export default function BookingQuestionsPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<BikePreferences>(booking.bikePreferences ?? { tourDuration: "", bikeExperience: "", bikePreference: "", electricAssistance: "", height: "" });
  const [showError, setShowError] = useState(false);
  const [customResponseOpen, setCustomResponseOpen] = useState(false);
  const question = questions[step];
  const answer = answers[question.key];
  const choose = (value: string) => { setAnswers((current) => ({ ...current, [question.key]: value })); setShowError(false); };
  const chooseCustomResponse = () => { setCustomResponseOpen(true); choose(""); };
  const advanceQuestion = (nextAnswers: BikePreferences) => {
    setShowError(false);
    setCustomResponseOpen(false);
    if (step === questions.length - 1) {
      updateBooking({ bikePreferences: nextAnswers });
      router.push("/bike-recommendations");
      return;
    }
    setStep((current) => current + 1);
  };
  const continueQuestion = () => {
    if (!answer?.trim()) { setShowError(true); return; }
    advanceQuestion(answers);
  };
  const skipQuestion = () => {
    updateBooking({ bikePreferences: answers });
    router.push("/bike-recommendations");
  };
  return <BookingLayout step="bike">
    <div className="booking-question-screen mx-auto w-full max-w-2xl rounded-[24px] bg-[#e8e5e2] p-4 md:p-6">
      <p className="eyebrow text-orange">Personal questions / Question {step + 1} of {questions.length}</p>
      <h1 className="mt-3 max-w-xl break-words text-2xl font-semibold leading-tight text-black md:text-3xl">{question.title}</h1>
      <div className="mt-5 grid gap-2">{question.options.map((option) => option === "Add Your Own Response" ? <div key={option}><BookingOption title={option} selected={customResponseOpen} onClick={chooseCustomResponse} />{customResponseOpen && <input value={answer ?? ""} onChange={(event) => choose(event.target.value)} className="mt-2 min-h-11 w-full rounded-[10px] border border-orange bg-transparent px-4 py-3 text-sm text-black outline-none placeholder:text-ink/45" placeholder="Write your response..." aria-label="Your own tour duration" />}</div> : <BookingOption key={option} title={option} selected={answer === option} onClick={() => { setCustomResponseOpen(false); choose(option); }} />)}</div>
      <div className="mt-3 flex justify-end"><SkipQuestion onClick={skipQuestion} /></div>
      {showError && <p role="alert" className="mt-4 text-sm font-bold text-orange">Please choose an answer before continuing.</p>}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={() => step === 0 ? router.push("/booking/date") : setStep((current) => current - 1)} className="min-h-11 text-sm font-bold text-orange">‹&nbsp; Back</button>
        <button type="button" onClick={continueQuestion} className="min-h-11 rounded-[20px] bg-orange px-7 py-3 text-sm font-bold text-white">{step === questions.length - 1 ? "See my bikes ↗" : "Continue"}</button>
      </div>
      <Link href="/booking/date" className="mt-8 inline-block text-xs font-bold text-ink/50">Change date</Link>
    </div>
  </BookingLayout>;
}
