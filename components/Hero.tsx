"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { MapGraphic } from "./MapGraphic";
import { Navbar } from "./Navbar";

export function Hero() {
  return <main className="grain min-h-screen overflow-hidden bg-paper">
    <Navbar />
    <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-5 pb-10 pt-8 md:grid-cols-[1.1fr_.9fr] md:px-10 md:pb-16">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10">
        <p className="eyebrow mb-8 text-orange">Slow travel / fast heartbeat</p>
        <h1 className="display max-w-[650px] text-[clamp(4.2rem,12vw,9.5rem)] font-bold">bike<br /><span className="text-orange">tours</span></h1>
        <p className="mt-9 max-w-sm text-base leading-relaxed text-ink/70 md:text-lg">Explore a growing range of one-way and round-trip bike tours in Denmark and across Europe.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/login">Log in</Button>
          <Button href="/register" variant="outline">Register</Button>
          <a href="/onboarding" className="basis-full inline-flex w-fit items-center gap-3 rounded-[10px] bg-orange px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#d94f00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange">Find your match <span aria-hidden="true">↗</span></a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .15 }} className="relative h-[390px] text-orange md:h-[600px]">
        <div className="absolute inset-0 rounded-[45%] bg-[#dedad6]/50 blur-2xl" /><div className="relative h-full"><MapGraphic /></div>
      </motion.div>
    </section>
  </main>;
}
