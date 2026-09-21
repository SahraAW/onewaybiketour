"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

type RouteChoice = {
  city: string;
  image: string;
  caption: string;
};

type Question = {
  title: string;
  options: string[];
};

const questions: Question[] = [
  {
    title: "What is your preferable terrain?",
    options: ["I prefer paved roads", "I prefer gravel roads", "I prefer roads with hills", "Add Your Own Response"]
  },
  {
    title: "How many kilometres do you plan to cycle per day?",
    options: ["Less than 30 km", "30–60 km", "60–90 km", "More than 90 km", "Add Your Own Response"]
  },
  {
    title: "Will you be carrying luggage during your ride?",
    options: ["I am travelling light", "A small backpack", "Some luggage on the bike", "A lot of luggage", "Add Your Own Response"]
  },
  {
    title: "Will you be cycling alone or with others?",
    options: ["Alone", "With one other person", "With a group", "Add Your Own Response"]
  }
];

const routeChoices: RouteChoice[] = [
  {
    city: "Berlin – Copenhagen",
    image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=85",
    caption: "choose your route"
  },
  {
    city: "Oslo – Copenhagen",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",
    caption: "choose your route"
  },
  {
    city: "Gothenburg – Copenhagen",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    caption: "choose your route"
  }
];

function RouteMark() {
  return <div className="route-mark" aria-hidden="true"><span /></div>;
}

function MiniRoute() {
  return <svg viewBox="0 0 300 80" className="h-auto w-full text-ink" aria-label="Route preview">
    <path d="M19 45c19-15 24 10 43-8 21-19 23 15 45-5 20-18 24 7 45-10 21-17 23 7 44-7 20-14 23 8 44-5 16-10 22 5 35-6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M19 45c19-15 24 10 43-8 21-19 23 15 45-5 20-18 24 7 45-10" fill="none" stroke="var(--orange)" strokeWidth="2.5" />
    <circle cx="19" cy="45" r="4" fill="var(--paper)" stroke="var(--orange)" strokeWidth="2" />
    <circle cx="275" cy="4" r="4" fill="var(--paper)" stroke="currentColor" strokeWidth="2" />
  </svg>;
}

export function RouteOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [step, setStep] = useState(0);
  const question = questions[step];
  const isRoutes = step === questions.length;
  const chooseAnswer = (answer: string) => setAnswers((current) => ({ ...current, [step]: answer }));
  return <main className="route-flow grain min-h-screen bg-[#e8e5e2]">
    <header className="flex items-center justify-between px-5 py-6 md:px-10">
      <Logo />
      <span className="text-xs">◎</span>
    </header>
    <div className={`mx-auto grid max-w-7xl gap-4 px-3 pb-8 ${!isRoutes ? "md:max-w-[440px]" : "md:grid-cols-3"}`}>
      {!isRoutes && <section className="route-panel flex min-h-[590px] flex-col px-8 pb-7 pt-28 md:px-9">
        <RouteMark />
        <div className="flex-1">
          <p className="eyebrow mb-2 text-[8px]">Personal questions</p>
          <h1 className="mb-7 text-xs font-normal">{question.title}</h1>
          <div className="space-y-2">
            {question.options.map((option) => <button key={option} onClick={() => chooseAnswer(option)} className={`route-option ${answers[step] === option ? "route-option-active" : ""}`}><span className="mr-2 inline-block h-2 w-2 rounded-full border border-ink/70" />{option}</button>)}
          </div>
          <button className="mt-7 block ml-auto text-[10px] text-ink/70">Skip <span className="ml-1">›</span></button>
        </div>
        <div className="flex items-center justify-between text-[10px] text-orange"><button onClick={() => step === 0 ? window.history.back() : setStep(step - 1)}>‹&nbsp; back</button><button className="rounded-full bg-orange px-7 py-2 text-white" onClick={() => setStep(step + 1)}>Continue</button></div>
        <div className="mt-14"><MiniRoute /></div>
      </section>}
      {isRoutes && routeChoices.map((route, index) => <section key={route.city} className={`route-panel flex min-h-[590px] flex-col px-10 pb-7 pt-24 transition-shadow ${selected === route.city ? "ring-2 ring-orange" : ""}`}>
        <RouteMark />
        <div className="flex-1">
          <h2 className="max-w-[190px] text-xl font-bold leading-tight tracking-[-.04em]">{route.city}</h2>
          <div className="route-photo mt-3" style={{ backgroundImage: `url("${route.image}")` }} role="img" aria-label={`${route.city} cycling route`}><button className="absolute left-[-17px] top-1/2 text-orange" aria-label="Previous image">‹</button><button className="absolute right-[-17px] top-1/2 text-orange" aria-label="Next image">›</button></div>
          <p className="mt-2 text-[8px] text-orange">{route.caption}</p>
          <button onClick={() => setStep(questions.length - 1)} className="mt-5 text-[10px] text-orange">‹&nbsp; back</button>
        </div>
        {index !== 1 && <div className="route-card-footer -mx-10 mt-8 px-8 pb-9 pt-5">
          <MiniRoute />
        </div>}
      </section>)}
    </div>
  </main>;
}
