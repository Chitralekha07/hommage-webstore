import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

const VISIT_KEY = "hommage-intro-seen-v2";

/** Soft brass chime, synthesised so no extra asset is downloaded. */
function playChime() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const strike = (freq: number, gain: number, delay: number, decay: number) => {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + delay;
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + 0.012);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      osc.connect(amp).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + decay + 0.1);
    };

    // brass bell partials
    strike(523.25, 0.13, 0, 3.6);
    strike(1046.5, 0.06, 0.005, 2.8);
    strike(1567.98, 0.03, 0.01, 2.2);
    strike(2093, 0.015, 0.015, 1.6);
    strike(783.99, 0.05, 0.35, 3.2);
    setTimeout(() => void ctx.close(), 5200);
  } catch {
    /* audio unavailable */
  }
}

/**
 * First-visit only: heritage brass double doors with frosted glass over a
 * blurred view of the store swing open to a chime, revealing the flower —
 * which then settles into the full HOMMAGE lockup inside its jharokha frame.
 */
export function IntroDoors() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0); // 0 closed · 1 open · 2 lockup · 3 exit
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(VISIT_KEY) === "1";
    } catch {
      seen = true;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      localStorage.setItem(VISIT_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    if (seen || reduced) return;

    setActive(true);
    document.body.style.overflow = "hidden";

    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    at(900, () => {
      setPhase(1);
      playChime();
    });
    at(4200, () => setPhase(2));
    at(7600, () => setPhase(3));
    at(8700, () => {
      document.body.style.overflow = "";
      setActive(false);
    });

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const skip = () => {
      timers.current.forEach(clearTimeout);
      setPhase(3);
      timers.current.push(
        setTimeout(() => {
          document.body.style.overflow = "";
          setActive(false);
        }, 900),
      );
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
  }, [active]);

  if (!active) return null;

  const opened = phase >= 1;
  const lockup = phase >= 2;

  return (
    <div
      className="fixed inset-0 z-[120] overflow-hidden bg-ivory"
      role="presentation"
      style={{
        perspective: "1800px",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 900ms ease",
      }}
    >
      {/* Blurred store interior sitting behind the glass */}
      <img
        src={brand.storefront}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "blur(26px) saturate(115%)", transform: "scale(1.15)", opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-ivory/70" />

      {/* Revealed lockup */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <IntroLockup opened={opened} lockup={lockup} />
      </div>

      {/* Doors */}
      <Door side="left" open={opened} />
      <Door side="right" open={opened} />

      <button
        type="button"
        onClick={() => {
          timers.current.forEach(clearTimeout);
          setPhase(3);
          setTimeout(() => {
            document.body.style.overflow = "";
            setActive(false);
          }, 900);
        }}
        className="eyebrow press absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-teal/70"
      >
        Enter
      </button>
    </div>
  );
}

function IntroLockup({ opened, lockup }: { opened: boolean; lockup: boolean }) {
  return (
    <div className="relative flex w-full max-w-5xl items-center justify-center">
      {/* jharokha / ogee frame — draws itself once the lockup settles */}
      <svg
        viewBox="0 0 900 460"
        className="pointer-events-none absolute w-[min(94vw,60rem)] text-teal"
        aria-hidden="true"
        style={{ opacity: lockup ? 1 : 0, transition: "opacity 900ms ease" }}
      >
        <path
          d="M40 230 C 120 224, 150 150, 150 96 L 300 96 C 360 96, 400 34, 450 34 C 500 34, 540 96, 600 96 L 750 96 C 750 150, 780 224, 860 230 C 780 236, 750 310, 750 364 L 600 364 C 540 364, 500 426, 450 426 C 400 426, 360 364, 300 364 L 150 364 C 150 310, 120 236, 40 230 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={lockup ? 0 : 1}
          style={{ transition: "stroke-dashoffset 2600ms cubic-bezier(0.22,1,0.36,1) 200ms" }}
          opacity={0.8}
        />
      </svg>

      <div className="relative flex items-center justify-center">
        <span
          className="wordmark text-teal"
          style={{
            fontSize: "clamp(1.5rem, 5.6vw, 4rem)",
            opacity: lockup ? 1 : 0,
            transform: `translateX(${lockup ? 0 : 70}px)`,
            transition: "opacity 1200ms ease 300ms, transform 1400ms cubic-bezier(0.22,1,0.36,1) 300ms",
          }}
        >
          H
        </span>
        <img
          src={brand.flower}
          alt="Hommage"
          className="mx-[0.1em] object-contain"
          style={{
            width: lockup ? "clamp(3rem, 9vw, 6.5rem)" : "clamp(9rem, 34vw, 20rem)",
            height: lockup ? "clamp(3rem, 9vw, 6.5rem)" : "clamp(9rem, 34vw, 20rem)",
            opacity: opened ? 1 : 0,
            transition:
              "width 1600ms cubic-bezier(0.22,1,0.36,1), height 1600ms cubic-bezier(0.22,1,0.36,1), opacity 1600ms ease",
          }}
        />
        <span
          className="wordmark text-teal"
          style={{
            fontSize: "clamp(1.5rem, 5.6vw, 4rem)",
            opacity: lockup ? 1 : 0,
            transform: `translateX(${lockup ? 0 : -70}px)`,
            transition: "opacity 1200ms ease 300ms, transform 1400ms cubic-bezier(0.22,1,0.36,1) 300ms",
          }}
        >
          MMAGE
        </span>
      </div>

      <span
        className="eyebrow absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap text-gold"
        style={{ opacity: lockup ? 1 : 0, transition: "opacity 1200ms ease 1400ms" }}
      >
        Experiential Retail
      </span>
    </div>
  );
}

function Door({ side, open }: { side: "left" | "right"; open: boolean }) {
  const left = side === "left";
  return (
    <div
      className="absolute top-0 h-full w-[calc(50%+1px)]"
      style={{
        [left ? "left" : "right"]: 0,
        transformOrigin: left ? "left center" : "right center",
        transformStyle: "preserve-3d",
        transform: `perspective(1800px) rotateY(${open ? (left ? -102 : 102) : 0}deg)`,
        transition: "transform 3400ms cubic-bezier(0.33, 0, 0.2, 1)",
        boxShadow: open ? "none" : "0 0 80px -20px rgba(0,0,0,0.35)",
      }}
    >
      <div className="relative h-full w-full">
        {/* frosted glass */}
        <div className="frosted absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/75 via-ivory-deep/55 to-ivory/80" />
        {/* light sweep across the glass */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: left
              ? "linear-gradient(115deg, transparent 30%, color-mix(in oklab, white 60%, transparent) 50%, transparent 70%)"
              : "linear-gradient(65deg, transparent 30%, color-mix(in oklab, white 60%, transparent) 50%, transparent 70%)",
          }}
        />

        {/* brass outer stile */}
        <div
          className="absolute inset-0"
          style={{
            border: "10px solid transparent",
            borderImage:
              "linear-gradient(150deg, color-mix(in oklab, var(--gold) 90%, white), var(--copper), color-mix(in oklab, var(--gold) 85%, white)) 1",
          }}
        />
        {/* brass mullions */}
        <div className="absolute inset-6 border border-gold/70 sm:inset-10" />
        <div className="absolute inset-9 border border-copper/45 sm:inset-14" />
        <div
          className="absolute inset-x-6 top-1/2 h-[3px] sm:inset-x-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 90%, white), var(--copper), transparent)",
          }}
        />
        {/* meeting stile + handle */}
        <div
          className={`absolute top-0 h-full w-[6px] ${left ? "right-0" : "left-0"}`}
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--copper) 70%, transparent), color-mix(in oklab, var(--gold) 95%, white), color-mix(in oklab, var(--copper) 70%, transparent))",
          }}
        />
        <div
          className={`absolute top-1/2 h-24 w-[7px] -translate-y-1/2 rounded-full ${
            left ? "right-4" : "left-4"
          }`}
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--gold) 95%, white), var(--copper) 55%, color-mix(in oklab, var(--gold) 90%, white))",
            boxShadow: "0 2px 10px -4px rgba(0,0,0,0.5)",
          }}
        />

        {/* ogee arch etched into the glass */}
        <svg
          className="absolute inset-0 h-full w-full text-gold/45"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={
              left
                ? "M100 6 C 74 6, 74 34, 46 34 L 22 34 L 22 166 L 46 166 C 74 166, 74 194, 100 194"
                : "M0 6 C 26 6, 26 34, 54 34 L 78 34 L 78 166 L 54 166 C 26 166, 26 194, 0 194"
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
