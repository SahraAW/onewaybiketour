import { NavigationSteps } from "./NavigationSteps";

export function BookingProgress({ activeStep }: Readonly<{ activeStep: string }>) {
  let step: 4 | 5 | 6 | 7 = 7;
  if (activeStep === "date") step = 4;
  if (activeStep === "bike" || activeStep === "size") step = 5;
  if (activeStep === "extras" || activeStep === "summary") step = 6;
  return <NavigationSteps step={step} />;
}
