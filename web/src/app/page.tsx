"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { profiles as seededProfiles, type Profile } from "@/data/profiles";
import { HeroHeader } from "@/components/HeroHeader";
import { MatchesPanel } from "@/components/MatchesPanel";
import { SwipeDeck } from "@/components/SwipeDeck";

export default function Home() {
  const [likes, setLikes] = useState<Profile[]>([]);
  const [sparks, setSparks] = useState<Profile[]>([]);
  const [history, setHistory] = useState<
    { profile: Profile; action: "like" | "nope" | "super"; at: number }[]
  >([]);

  const handleSwipe = (profile: Profile, action: "like" | "nope" | "super") => {
    if (action === "like") {
      setLikes((prev) => [profile, ...prev.filter((p) => p.id !== profile.id)]);
    }

    if (action === "super") {
      setSparks((prev) => [profile, ...prev.filter((p) => p.id !== profile.id)]);
    }

    setHistory((prev) => [{ profile, action, at: Date.now() }, ...prev].slice(0, 6));
  };

  return (
    <main className="min-h-screen w-full bg-transparent px-5 py-16 md:px-14 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <HeroHeader />
        <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,3fr),minmax(0,2fr)]">
          <SwipeDeck profiles={seededProfiles} onSwipe={handleSwipe} />
          <div className="flex flex-col gap-6">
            <MatchesPanel likes={likes} sparks={sparks} />
            <HistoryPanel history={history} />
          </div>
        </section>
      </div>
    </main>
  );
}

function HistoryPanel({
  history,
}: {
  history: { profile: Profile; action: "like" | "nope" | "super"; at: number }[];
}) {
  const toneStyles = {
    like: "bg-rose-400/20 border-rose-300/20 text-rose-100",
    nope: "bg-white/5 border-white/20 text-white/70",
    super: "bg-amber-300/20 border-amber-200/30 text-amber-50",
  };

  const labels = {
    like: "Liked",
    nope: "Passed",
    super: "Sparked",
  };

  return (
    <div className="glass-panel flex flex-col gap-4 rounded-4xl p-6 text-white">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold uppercase tracking-widest text-white/80">
          Activity Pulse
        </h3>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Live feed
        </div>
      </header>
      <div className="flex flex-col gap-3">
        {history.length === 0 && (
          <p className="text-sm text-white/60">
            Swipe right or spark someone to see them appear here in your live
            feed.
          </p>
        )}
        {history.map(({ profile, action, at }) => (
          <div
            key={`${profile.id}-${action}-${at}`}
            className={`flex items-center justify-between rounded-3xl border px-4 py-3 text-sm ${toneStyles[action]}`}
          >
            <span>
              {profile.name} · {profile.age}
            </span>
            <span className="text-xs uppercase tracking-widest">
              {labels[action]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
