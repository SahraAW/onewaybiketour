"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { TourCarousel } from "@/components/TourCarousel";
import { tours } from "@/lib/tours";
import { defaultPreferences, getRecommendedTours, preferencesFromAnswers, type TourRecommendation } from "@/lib/recommendations";
import { NavigationSteps } from "@/components/NavigationSteps";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<TourRecommendation[]>([]);
  const [hasPreferences, setHasPreferences] = useState(false);
  useEffect(() => {
    const raw = window.localStorage.getItem("one-way-bike-tours-preferences");
    if (!raw) { setRecommendations(getRecommendedTours(tours, defaultPreferences)); return; }
    try {
      const saved = JSON.parse(raw) as { answers?: Record<number, string> };
      setRecommendations(getRecommendedTours(tours, preferencesFromAnswers(saved.answers ?? {})));
      setHasPreferences(true);
    } catch { setRecommendations(getRecommendedTours(tours, defaultPreferences)); }
  }, []);
  return <main className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10"><Logo /><Link href="/onboarding" className="text-xs font-bold text-ink/55">Retake questions</Link></header><section className="recommendations-page mx-auto w-full max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pb-24 md:pt-14"><div className="recommendations-intro mx-auto max-w-3xl"><p className="eyebrow text-orange">Your preferences / 05</p><h1 className="display mt-5 max-w-3xl text-6xl font-bold md:text-9xl">Tours<br /><span className="text-orange">for you.</span></h1><p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">{hasPreferences ? "Sorted from your answers, with the strongest matches first." : "Take the questions to get recommendations shaped around your ride."}</p></div><div className="recommendations-results mx-auto mt-10 w-full max-w-5xl md:mt-12"><TourCarousel recommendations={recommendations} /></div></section><NavigationSteps step={3} /><Footer /></main>;
}
