import flower from "@/assets/hommage-flower.png.asset.json";
import logo from "@/assets/hommage-logo.png.asset.json";
import logoTeal from "@/assets/hommage-logo-teal.png.asset.json";
import heroVideo from "@/assets/hommage-hero.mp4.asset.json";

export const brand = {
  flower: flower.url,
  logo: logo.url,
  logoTeal: logoTeal.url,
  heroVideo: heroVideo.url,
  name: "HOMMAGE",
} as const;

export const navigation = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/hampers", label: "Hampers" },
  { to: "/events", label: "Events" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "About / Contact" },
] as const;
