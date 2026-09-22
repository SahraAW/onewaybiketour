"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { FaqDialog } from "./FaqDialog";

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
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [customResponseOpen, setCustomResponseOpen] = useState(false);
  const [step, setStep] = useState(0);
  const question = questions[step];
  const isRoutes = step === questions.length;
  const chooseAnswer = (answer: string) => setAnswers((current) => ({ ...current, [step]: answer }));
  const chooseCustomResponse = () => {
    setCustomResponseOpen(true);
    chooseAnswer("");
  };
  useEffect(() => setCustomResponseOpen(false), [step]);
  useEffect(() => {
    if (isRoutes) {
      window.localStorage.setItem("one-way-bike-tours-preferences", JSON.stringify({ answers, route: selected }));
      router.push("/recommendations");
    }
  }, [answers, isRoutes, router, selected]);
  return <main className="route-flow grain min-h-screen bg-[#e8e5e2]">
    <header className="flex items-center justify-between px-5 py-6 md:px-10">
      <Logo />
      <FaqDialog />
    </header>
    <div className={`route-flow-content mx-auto grid w-full gap-4 px-[clamp(1.25rem,6vw,7rem)] pb-8 ${!isRoutes ? "max-w-3xl" : "md:grid-cols-3"}`}>
      {!isRoutes && <section className="route-panel flex flex-col px-0 pb-7 pt-16 md:pt-24">
        <RouteMark />
        <div className="flex-1">
          <p className="eyebrow mb-3 text-orange">Question {step + 1} of {questions.length}</p>
          <h1 className="mb-8 max-w-xl text-xl font-semibold leading-tight md:text-2xl">{question.title}</h1>
          <div className="space-y-3">
            {question.options.map((option) => option === "Add Your Own Response" ? (
              <div key={option}>
                <button type="button" onClick={chooseCustomResponse} className={`route-option ${customResponseOpen ? "route-option-active" : ""}`}><span className="mr-3 inline-block h-3 w-3 rounded-full border border-ink/70" />{option}</button>
                {customResponseOpen && <input value={answers[step] ?? ""} onChange={(event) => chooseAnswer(event.target.value)} className="mt-2 w-full rounded-[10px] border border-orange bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink/45 focus:ring-2 focus:ring-orange/25" placeholder="Write your response..." aria-label="Your own response" />}
              </div>
            ) : <button type="button" key={option} onClick={() => { setCustomResponseOpen(false); chooseAnswer(option); }} className={`route-option ${answers[step] === option ? "route-option-active" : ""}`}><span className="mr-3 inline-block h-3 w-3 rounded-full border border-ink/70" />{option}</button>)}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-orange"><button onClick={() => step === 0 ? window.history.back() : setStep(step - 1)}>‹&nbsp; back</button><button className="rounded-full bg-orange px-7 py-2 text-white" onClick={() => setStep(step + 1)}>Continue</button></div>
      </section>}
      {isRoutes && routeChoices.map((route, index) => <section key={route.city} className={`route-panel flex flex-col px-0 pb-7 pt-16 transition-shadow ${selected === route.city ? "route-panel-selected" : ""}`}>
        <RouteMark />
        <div className="flex-1">
          <h2 className="max-w-[190px] text-xl font-bold leading-tight tracking-[-.04em]">{route.city}</h2>
          <button type="button" onClick={() => setSelected(route.city)} className="route-photo mt-3 block w-full text-left" style={{ backgroundImage: `url("${route.image}")` }} aria-label={`Choose ${route.city} cycling route`}><span className="absolute left-2 top-1/2 -translate-y-1/2 text-orange" aria-hidden="true">‹</span><span className="absolute right-2 top-1/2 -translate-y-1/2 text-orange" aria-hidden="true">›</span></button>
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
