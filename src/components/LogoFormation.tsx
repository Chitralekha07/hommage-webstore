import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

/**
 * Scroll-linked recreation of the HOMMAGE lockup: the flower sits pinned centre
 * screen, and as the visitor scrolls "H" and "MMAGE" track outward around it
 * while the ogee frame draws itself in.
 */
export function LogoFormation() {
  const container = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setP(1);
      return;
    }
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const node = container.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setP(scrolled / Math.max(total, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
  const letters = ease((p - 0.08) / 0.5);
  const frame = ease((p - 0.35) / 0.45);
  const settle = ease((p - 0.72) / 0.28);

  return (
    <div ref={container} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
        <div
          className="relative flex items-center justify-center"
          style={{
            transform: `scale(${1 - settle * 0.18}) translateY(${settle * -18}px)`,
            opacity: 1 - settle * 0.15,
          }}
        >
          {/* ogee frame from the logo, fading in on scroll */}
          <img
            src={brand.frame}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute w-[min(96vw,68rem)] object-contain"
            style={{
              opacity: frame * 0.95,
              transform: `scale(${0.96 + frame * 0.04})`,
            }}
          />


          <div className="relative flex items-center justify-center">
            <span
              className="wordmark text-teal"
              style={{
                fontSize: "clamp(1.75rem, 6.5vw, 4.5rem)",
                opacity: letters,
                transform: `translateX(${(1 - letters) * 60}px)`,
                transition: "none",
              }}
            >
              H
            </span>
            <img
              src={brand.flower}
              alt="HOMMAGE flower emblem"
              className="mx-[0.1em] object-contain"
              style={{ width: "clamp(3rem, 10vw, 7rem)", height: "clamp(3rem, 10vw, 7rem)" }}
            />
            <span
              className="wordmark text-teal"
              style={{
                fontSize: "clamp(1.75rem, 6.5vw, 4.5rem)",
                opacity: letters,
                transform: `translateX(${(1 - letters) * -60}px)`,
                transition: "none",
              }}
            >
              MMAGE
            </span>
          </div>
        </div>


        <span
          className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
          style={{ opacity: 1 - ease(p / 0.25) }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
}
