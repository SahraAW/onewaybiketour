import Image from "next/image";
import denmarkMap from "@/app/onboarding/Skærmbillede_2026-09-21_203921-removebg-preview.png";
import animationLogo from "../.next-dev/cache/images/Animation/Animation_Logo_03.gif";

export function MapGraphic({ detail = false }: Readonly<{ detail?: boolean }>) {
  if (!detail) {
    return (
      <div className="relative h-full w-full">
        <Image src={denmarkMap} alt="Illustrated map of Denmark" className="h-full w-full object-contain" priority />
        <Image
          src={animationLogo}
          alt="Animated route marker"
          unoptimized
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={animationLogo}
        alt="Animated route marker"
        unoptimized
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
      />
    </div>
  );
}
