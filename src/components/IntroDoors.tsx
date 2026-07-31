import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

const SESSION_KEY = "hommage-intro-seen";

/**
 * Frosted glass parting doors with gold ogee framing.
 * Plays once per browser session; skippable; respects reduced motion.
 */
export function IntroDoors() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduced) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable */
    }

    setGone(false);
    setMounted(true);
    document.body.style.overflow = "hidden";

    timers.current.push(setTimeout(() => setOpen(true), 900));
    timers.current.push(
      setTimeout(() => {
        document.body.style.overflow = "";
        setGone(true);
      }, 4200),
    );

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!mounted || gone) return;
    const skip = () => {
      timers.current.forEach(clearTimeout);
      setOpen(true);
      document.body.style.overflow = "";
      setTimeout(() => setGone(true), 900);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
  }, [mounted, gone]);

  if (gone) return null;

  const panel =
    "absolute top-0 h-full w-[calc(50%+1px)] frosted transition-transform duration-[2400ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div
      className="fixed inset-0 z-[120] overflow-hidden bg-ivory"
      role="presentation"
      onClick={() => {
        timers.current.forEach(clearTimeout);
        setOpen(true);
        document.body.style.overflow = "";
        setTimeout(() => setGone(true), 900);
      }}
    >
      {/* Revealed mark behind the doors */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="flex flex-col items-center transition-all duration-[1600ms] ease-out"
          style={{ opacity: open ? 1 : 0, transform: `scale(${open ? 1 : 0.9})` }}
        >
          <img
            src={brand.flower}
            alt=""
            aria-hidden="true"
            className="h-32 w-32 object-contain sm:h-44 sm:w-44"
          />
          <span className="wordmark mt-6 text-[0.65rem] text-gold sm:text-xs">
            Experiential Retail
          </span>
        </div>
      </div>

      {/* Left door */}
      <div
        className={`${panel} left-0`}
        style={{ transform: open ? "translateX(-101%)" : "translateX(0)" }}
      >
        <DoorFace side="left" />
      </div>
      {/* Right door */}
      <div
        className={`${panel} right-0`}
        style={{ transform: open ? "translateX(101%)" : "translateX(0)" }}
      >
        <DoorFace side="right" />
      </div>
    </div>
  );
}

function DoorFace({ side }: { side: "left" | "right" }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory-deep/60 to-ivory/80" />
      {/* light sweep */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            side === "left"
              ? "linear-gradient(115deg, transparent 30%, color-mix(in oklab, white 55%, transparent) 50%, transparent 70%)"
              : "linear-gradient(65deg, transparent 30%, color-mix(in oklab, white 55%, transparent) 50%, transparent 70%)",
        }}
      />
      {/* gold framing */}
      <div className="absolute inset-6 border border-gold/50 sm:inset-10" />
      <div className="absolute inset-8 border border-gold/25 sm:inset-14" />
      <div
        className={`absolute top-1/2 h-40 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold to-transparent ${
          side === "left" ? "right-0" : "left-0"
        }`}
      />
      {/* ogee arch half */}
      <svg
        className="absolute inset-0 h-full w-full text-gold/35"
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={
            side === "left"
              ? "M100 6 C 74 6, 74 34, 46 34 L 22 34 L 22 166 L 46 166 C 74 166, 74 194, 100 194"
              : "M0 6 C 26 6, 26 34, 54 34 L 78 34 L 78 166 L 54 166 C 26 166, 26 194, 0 194"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
