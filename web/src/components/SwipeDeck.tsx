"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, Sparkles, X } from "lucide-react";
import type { Profile } from "@/data/profiles";

type SwipeAction = "like" | "nope" | "super";

type SwipeDeckProps = {
  profiles: Profile[];
  onSwipe?: (profile: Profile, action: SwipeAction) => void;
};

const exitVariants = {
  like: { x: 500, rotate: 20, opacity: 0 },
  nope: { x: -500, rotate: -15, opacity: 0 },
  super: { y: -500, rotate: 0, opacity: 0 },
};

const swipeThreshold = 120;

export function SwipeDeck({ profiles, onSwipe }: SwipeDeckProps) {
  const [deck, setDeck] = useState(profiles);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<SwipeAction>("like");

  const activeProfile = deck[0];
  const nextProfile = deck[1];

  const trophies = useMemo(() => {
    if (!activeProfile) return [];
    return activeProfile.interests.slice(0, 3);
  }, [activeProfile]);

  const handleAction = (action: SwipeAction) => {
    if (!activeProfile || isAnimating) return;
    setIsAnimating(true);
    setExitDirection(action);

    setDeck((prev) => prev.slice(1));
    onSwipe?.(activeProfile, action);
    setTimeout(() => {
      setIsAnimating(false);
    }, 260);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => {
    if (!activeProfile) return;
    const { x, y } = info.offset;
    if (x > swipeThreshold) {
      handleAction("like");
    } else if (x < -swipeThreshold) {
      handleAction("nope");
    } else if (y < -swipeThreshold) {
      handleAction("super");
    }
  };

  return (
    <div className="relative flex w-full max-w-xl flex-col gap-6">
      <div className="relative h-[520px] w-full">
        {nextProfile && (
          <motion.div
            key={nextProfile.id}
            className="absolute inset-0 -z-10"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 0.98, y: 8, opacity: 0.6 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <FallbackCard profile={nextProfile} muted />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {activeProfile ? (
            <motion.div
              key={activeProfile.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={exitVariants[exitDirection]}
              whileTap={{ cursor: "grabbing" }}
              className="h-full w-full cursor-grab select-none"
            >
              <ProfileCard profile={activeProfile} trophies={trophies} />
            </motion.div>
          ) : (
            <div className="glass-panel flex h-full w-full flex-col items-center justify-center rounded-4xl px-10 text-center">
              <Sparkles className="mb-4 h-10 w-10 text-rose-300" />
              <h3 className="text-2xl font-semibold text-white">
                You&apos;re all caught up!
              </h3>
              <p className="mt-3 text-sm text-violet-200/80">
                New vibes are being curated for you. Check back soon or adjust
                your preferences to unlock more connections.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-5">
        <ActionButton
          variant="ghost"
          icon={<X className="h-6 w-6" />}
          label="Nope"
          onClick={() => handleAction("nope")}
        />
        <ActionButton
          variant="primary"
          icon={<Heart className="h-8 w-8" />}
          label="Like"
          onClick={() => handleAction("like")}
        />
        <ActionButton
          variant="secondary"
          icon={<Sparkles className="h-7 w-7" />}
          label="Spark"
          onClick={() => handleAction("super")}
        />
      </div>
    </div>
  );
}

function ProfileCard({
  profile,
  trophies,
}: {
  profile: Profile;
  trophies: string[];
}) {
  return (
    <div className="glass-panel relative flex h-full w-full flex-col overflow-hidden rounded-4xl">
      <div className="relative h-[340px] w-full shrink-0">
        <Image
          src={profile.cover}
          alt={`${profile.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          <Flame className="h-4 w-4 text-rose-400" />
          <span>{profile.compatibility}% vibe match</span>
        </div>

        <div className="absolute bottom-5 left-5 flex items-end gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/20">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-2 text-white">
              <h2 className="text-3xl font-semibold capitalize">
                {profile.name}
              </h2>
              <span className="text-xl text-white/80">{profile.age}</span>
            </div>
            <p className="text-sm text-violet-100/80">
              {profile.jobTitle} · {profile.company}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/60">
              {profile.location}
            </p>
            {trophies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {trophies.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-widest text-white/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-6 py-6 text-white">
        <div>
          <p className="text-sm text-violet-200/90">{profile.bio}</p>
        </div>

        <div className="rounded-3xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-violet-200/80">
            {profile.prompt}
          </p>
          <p className="mt-1 text-base text-white">{profile.promptAnswer}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-white/8 px-3 py-1 text-xs uppercase tracking-wide text-violet-100"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FallbackCard({
  profile,
  muted = false,
}: {
  profile: Profile;
  muted?: boolean;
}) {
  return (
    <div className="glass-panel flex h-full w-full flex-col overflow-hidden rounded-4xl">
      <div className="relative h-[320px] w-full">
        <Image
          src={profile.cover}
          alt={profile.name}
          fill
          className={`object-cover ${muted ? "opacity-70" : ""}`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-6 py-5 text-white/90">
        <h3 className="text-2xl font-semibold">
          {profile.name} <span className="text-lg text-white/70">{profile.age}</span>
        </h3>
        <p className="text-sm text-white/70">{profile.bio}</p>
      </div>
    </div>
  );
}

type ActionButtonVariant = "primary" | "secondary" | "ghost";

function ActionButton({
  variant,
  icon,
  label,
  onClick,
}: {
  variant: ActionButtonVariant;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  const base =
    "flex h-20 w-24 flex-col items-center justify-center gap-2 rounded-3xl transition-all duration-150 active:scale-95";
  const styles: Record<ActionButtonVariant, string> = {
    primary: "bg-rose-500/80 text-white shadow-lg shadow-rose-500/40",
    secondary: "bg-indigo-400/80 text-white shadow-lg shadow-indigo-400/40",
    ghost:
      "bg-white/8 text-white border border-white/20 shadow-lg shadow-black/30",
  };

  return (
    <button type="button" className={`${base} ${styles[variant]}`} onClick={onClick}>
      {icon}
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </button>
  );
}
