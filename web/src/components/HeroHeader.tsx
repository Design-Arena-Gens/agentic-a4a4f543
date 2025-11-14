"use client";

import { motion } from "framer-motion";
import { Flame, LocateFixed, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function HeroHeader() {
  return (
    <div className="flex flex-col gap-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/70"
      >
        <Flame className="h-4 w-4 text-rose-300" />
        Heartwave Live
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl font-semibold leading-tight md:text-5xl"
      >
        Swipe into your next chapter with chemistry-tested matches curated for
        your vibe.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="max-w-xl text-base text-white/70 md:text-lg"
      >
        Say hey to smart recommendations, Spark boosts, and instant IRL plans.
        Every swipe fuels your personal discovery loop.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-wrap items-center gap-4"
      >
        <LiveStat
          icon={<Sparkles className="h-4 w-4 text-amber-300" />}
          title="Sparked tonight"
          value="128"
          descriptor="+12% vs yesterday"
        />
        <LiveStat
          icon={<LocateFixed className="h-4 w-4 text-emerald-300" />}
          title="Active in your orbit"
          value="47"
          descriptor="Within 5 miles"
        />
      </motion.div>
    </div>
  );
}

function LiveStat({
  icon,
  title,
  value,
  descriptor,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  descriptor: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/5 px-4 py-3 text-sm uppercase tracking-wide text-white/70">
      <span className="rounded-full bg-white/10 p-1">{icon}</span>
      <div>
        <p className="text-xs text-white/50">{title}</p>
        <p className="text-base font-semibold text-white">{value}</p>
        <p className="text-[10px] text-white/40">{descriptor}</p>
      </div>
    </div>
  );
}
