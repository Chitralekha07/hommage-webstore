export type PostSection = "event" | "journal";
export type MediaType = "image" | "video";
export type HeroAspect = "16/9" | "4/5" | "1/1" | "full";

export type Post = {
  id: string;
  section: string;
  title: string;
  body: string;
  media_url: string | null;
  media_type: string | null;
  event_date: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  hero_url: string | null;
  hero_type: string | null;
  hero_aspect: string;
};

export const heroAspects: { value: HeroAspect; label: string }[] = [
  { value: "16/9", label: "16:9 — cinematic" },
  { value: "4/5", label: "4:5 — portrait" },
  { value: "1/1", label: "1:1 — square" },
  { value: "full", label: "Full bleed" },
];

export function aspectClass(aspect: string): string {
  switch (aspect) {
    case "16/9":
      return "aspect-[16/9]";
    case "4/5":
      return "aspect-[4/5]";
    case "1/1":
      return "aspect-square";
    default:
      return "aspect-[9/16] md:aspect-[3/4]";
  }
}

/** Storage paths are served through a public streaming route. */
export function mediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/api/public/media/${path}`;
}

export function paragraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
