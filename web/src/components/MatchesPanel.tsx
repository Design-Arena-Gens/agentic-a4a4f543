"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Profile } from "@/data/profiles";

type MatchesPanelProps = {
  likes: Profile[];
  sparks: Profile[];
};

export function MatchesPanel({ likes, sparks }: MatchesPanelProps) {
  return (
    <div className="glass-panel flex w-full max-w-sm flex-col gap-6 rounded-4xl p-6 text-white">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold uppercase tracking-widest text-white/90">
            Connections
          </h3>
          <p className="text-sm text-white/60">
            {likes.length + sparks.length} curated for you
          </p>
        </div>
        <div className="flex -space-x-3">
          {[...sparks, ...likes].slice(0, 3).map((profile) => (
            <div
              key={profile.id}
              className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/30"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-5">
        <SectionHeader
          title="Sparked Tonight"
          icon={<Sparkles className="h-4 w-4 text-amber-300" />}
          glow="from-amber-300/50 via-rose-400/30 to-transparent"
        />
        <div className="flex flex-col gap-4">
          {sparks.length === 0 && (
            <EmptyState
              label="No spark matches yet"
              description="Try the spark button to send a super-charged intro."
            />
          )}
          {sparks.map((profile, index) => (
            <ConnectionBadge
              key={profile.id}
              profile={profile}
              tone="spark"
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <SectionHeader
          title="Recent Likes"
          icon={<Heart className="h-4 w-4 text-rose-300" />}
          glow="from-rose-500/60 via-purple-500/20 to-transparent"
        />
        <div className="flex flex-col gap-4">
          {likes.length === 0 && (
            <EmptyState
              label="No likes yet"
              description="Tap the heart when you feel the vibe."
            />
          )}
          {likes.map((profile, index) => (
            <ConnectionBadge
              key={profile.id}
              profile={profile}
              tone="like"
              delay={index * 0.04}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  icon,
  glow,
}: {
  title: string;
  icon: ReactNode;
  glow: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/70">
        <span className="rounded-full bg-white/10 p-1">{icon}</span>
        {title}
      </div>
      <div className={`h-px w-24 bg-gradient-to-r ${glow}`} />
    </div>
  );
}

function ConnectionBadge({
  profile,
  tone,
  delay,
}: {
  profile: Profile;
  tone: "like" | "spark";
  delay: number;
}) {
  const palette =
    tone === "spark"
      ? "from-amber-300/20 via-rose-500/10 to-transparent border-amber-200/40"
      : "from-rose-400/20 via-purple-500/10 to-transparent border-rose-200/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex items-center gap-4 rounded-3xl border ${palette} bg-gradient-to-r px-4 py-3`}
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/20">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{profile.name}</p>
        <p className="text-xs text-white/65">
          {profile.location} · {profile.jobTitle}
        </p>
      </div>
      <span className="text-xs uppercase tracking-widest text-white/60">
        {tone === "spark" ? "Spark" : "Liked"}
      </span>
    </motion.div>
  );
}

function EmptyState({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-3xl border border-white/10 bg-white/4 px-4 py-3 text-white/70">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-white/50">{description}</p>
    </div>
  );
}
