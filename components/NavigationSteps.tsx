"use client";

import { useState } from "react";

const stepLabels = ["Home", "Onboarding", "Recommendations", "Booking date", "Questions and bike", "Extras and summary", "Checkout"];

export function NavigationSteps({ step }: Readonly<{ step: 1 | 2 | 3 | 4 | 5 | 6 | 7 }>) {
  const [failed, setFailed] = useState(false);
  const asset = `/navigation/Navigation_Step${step}.svg`;
  if (failed) return <div className="navigation-steps-fallback" aria-label={`Progress: ${stepLabels[step - 1]}`}>Step {step} of 7</div>;
  return <div className="navigation-steps" aria-label={`Progress: ${stepLabels[step - 1]}`}><img src={asset} alt={`Step ${step} of 7: ${stepLabels[step - 1]}`} onError={() => setFailed(true)} /></div>;
}
