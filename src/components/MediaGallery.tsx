import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { EventMedia } from "@/data/events";

export function MediaGallery({ media }: { media: EventMedia[] }) {
  const [active, setActive] = useState<EventMedia | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {media.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActive(item)}
            className={`group relative overflow-hidden border border-gold/20 ${
              index === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
            }`}
            aria-label={`Open ${item.alt}`}
          >
            {item.kind === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 bg-teal-deep/0 transition-colors duration-700 group-hover:bg-teal-deep/10" />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[130] grid place-items-center bg-teal-deep/90 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-ivory"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X className="h-6 w-6" />
          </button>
          {active.kind === "image" ? (
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[88vh] w-auto max-w-full object-contain"
            />
          ) : (
            <video
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[88vh] w-auto max-w-full"
            />
          )}
        </div>
      )}
    </>
  );
}
