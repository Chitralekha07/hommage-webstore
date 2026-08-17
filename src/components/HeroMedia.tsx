import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StoreFilm } from "@/components/StoreFilm";
import { aspectClass, mediaUrl, type SiteSettings } from "@/lib/content";

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

export function HeroMedia({ className = "" }: { className?: string }) {
  const { data } = useSiteSettings();
  const src = mediaUrl(data?.hero_url);

  if (!src) return <StoreFilm className={className} />;

  const frame = aspectClass(data?.hero_aspect ?? "full");

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--teal)_70%,transparent)] ${className}`}
    >
      {data?.hero_type === "video" ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Hommage hero film"
          className={`${frame} h-auto w-full object-cover`}
        />
      ) : (
        <img src={src} alt="Hommage" className={`${frame} h-auto w-full object-cover`} />
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-gold/25 ring-inset" />
    </div>
  );
}
