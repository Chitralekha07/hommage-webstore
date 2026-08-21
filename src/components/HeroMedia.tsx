import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { aspectClass, mediaUrl, type SiteSettings } from "@/lib/content";
import storePano from "@/assets/store-pano.jpg";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("id, hero_url, hero_type, hero_aspect")
        .eq("id", "main")
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? null;
    },
  });
}

/** Aspect currently in use — "pano" renders as a full-width banner on the home page. */
export function useHeroAspect(): string {
  const { data } = useSiteSettings();
  if (!data?.hero_url) return "pano";
  return data.hero_aspect ?? "full";
}

export function HeroMedia({ className = "" }: { className?: string }) {
  const { data } = useSiteSettings();
  const src = mediaUrl(data?.hero_url) ?? storePano;
  const isVideo = Boolean(data?.hero_url) && data?.hero_type === "video";
  const aspect = data?.hero_url ? (data.hero_aspect ?? "full") : "pano";
  const frame = aspectClass(aspect);
  const fit = aspect === "pano" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--teal)_70%,transparent)] ${className}`}
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Hommage hero film"
          className={`${frame} h-auto w-full ${fit}`}
        />
      ) : (
        <img
          src={src}
          alt="Inside the Hommage store in Solapur"
          className={`${frame} h-auto w-full ${fit}`}
        />
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-gold/25 ring-inset" />
    </div>
  );
}
