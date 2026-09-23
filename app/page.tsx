import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { NavigationSteps } from "@/components/NavigationSteps";

export default function Home() {
  return <><Hero /><NavigationSteps step={1} /><Footer /></>;
}
