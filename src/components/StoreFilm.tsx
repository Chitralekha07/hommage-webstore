import { useEffect, useRef } from "react";
import { brand } from "@/lib/brand";

/**
 * Store film in its native 9:16 frame, softly rounded, looping the first
 * 16 seconds so the sequence never runs past its close.
 */
export function StoreFilm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => {
      if (el.currentTime >= 16) {
        el.currentTime = 0;
        void el.play().catch(() => undefined);
      }
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--teal)_70%,transparent)] ${className}`}
    >
      <video
        ref={ref}
        src={brand.storeHero}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Film from inside the Hommage store"
        className="aspect-[9/16] h-auto w-full object-cover"
      />
      <span className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-gold/25 ring-inset" />
    </div>
  );
}
