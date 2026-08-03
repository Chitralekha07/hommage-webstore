import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { brand } from "@/lib/brand";

const MUTE_KEY = "hommage-audio-muted";

/**
 * Low-volume heritage tune running behind the site. Browsers block autoplay
 * until the visitor interacts, so we arm playback on the first gesture.
 */
export function AmbientAudio() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored = true;
    try {
      stored = localStorage.getItem(MUTE_KEY) !== "0";
    } catch {
      stored = true;
    }
    setMuted(stored);
    setReady(true);
    if (stored) return;

    const start = () => {
      const el = ref.current;
      if (!el) return;
      el.volume = 0.16;
      void el.play().catch(() => undefined);
    };
    start();
    const once = () => {
      start();
      window.removeEventListener("pointerdown", once);
      window.removeEventListener("keydown", once);
    };
    window.addEventListener("pointerdown", once);
    window.addEventListener("keydown", once);
    return () => {
      window.removeEventListener("pointerdown", once);
      window.removeEventListener("keydown", once);
    };
  }, []);


  const toggle = () => {
    const el = ref.current;
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
    if (!el) return;
    if (next) {
      el.pause();
    } else {
      el.volume = 0.16;
      void el.play().catch(() => undefined);
    }
  };

  return (
    <>
      <audio ref={ref} src={brand.ambience} loop preload="none" aria-hidden="true" />
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={muted ? "Play ambient music" : "Mute ambient music"}
          className="press fixed right-5 bottom-5 z-[90] grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-ivory/80 text-teal backdrop-blur-md"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {!muted && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-gold/50"
              style={{ animation: "chime-ring 2.8s ease-out infinite" }}
            />
          )}
        </button>
      )}
    </>
  );
}
