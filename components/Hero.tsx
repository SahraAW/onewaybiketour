"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapGraphic } from "./MapGraphic";

export function Hero() {
  return <main className="grain min-h-[calc(100svh-104px)] overflow-hidden bg-paper">
    <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl content-start items-start gap-10 px-5 pb-10 pt-4 md:grid-cols-[1.1fr_.9fr] md:px-10 md:pb-16 md:pt-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10">
        <p className="eyebrow mb-8 text-orange">Slow travel / fast heartbeat</p>
        <h1 className="display max-w-[650px] text-[clamp(3.5rem,12vw,9.5rem)] font-bold">bike<br /><span className="text-orange">tours</span></h1>
        <p className="mt-9 max-w-sm text-base leading-relaxed text-ink/70 md:text-lg">Explore a growing range of one-way and round-trip bike tours in Denmark and across Europe.</p>
        <div className="mt-8 grid max-w-[320px] grid-cols-2 gap-2">
          <p className="col-span-2 mb-3 text-center text-sm leading-relaxed text-black">Do you already have an account?</p>
          <Link href="/login" className="inline-flex min-h-10 items-center justify-center rounded-[20px] border border-black px-3 py-2 text-[10px] font-bold tracking-[0.02em] text-black transition-colors hover:text-orange focus-visible:text-orange">Log in</Link>
          <Link href="/register" className="inline-flex min-h-10 items-center justify-center rounded-[20px] border border-black px-3 py-2 text-[10px] font-bold tracking-[0.02em] text-black transition-colors hover:text-orange focus-visible:text-orange">Create one</Link>
          <Link href="/onboarding" className="col-span-2 mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[20px] bg-orange px-4 py-2.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#d94f00]">Find your match <span aria-hidden="true">↗</span></Link>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .15 }} className="relative h-[min(390px,82vw)] min-h-[280px] text-orange md:h-[600px]">
        <div className="absolute inset-0 rounded-[45%] bg-[#dedad6]/50 blur-2xl" /><div className="relative h-full"><MapGraphic /></div>
      </motion.div>
    </section>
  </main>;
}
