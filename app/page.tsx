import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { NavigationSteps } from "@/components/NavigationSteps";

export default function Home() {
  return <><div className="navigation-page-step"><NavigationSteps step={1} /></div><Hero /><Footer /></>;
}
