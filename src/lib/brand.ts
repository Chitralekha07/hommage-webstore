import flower from "@/assets/hommage-flower.png.asset.json";
import logo from "@/assets/hommage-logo.png.asset.json";
import logoTeal from "@/assets/hommage-logo-teal.png.asset.json";
import frame from "@/assets/hommage-frame.png.asset.json";
import heroVideo from "@/assets/hommage-hero.mp4.asset.json";
import storeHero from "@/assets/store-hero.mp4.asset.json";
import storefront from "@/assets/storefront.webp.asset.json";
import ambience from "@/assets/hommage-ambience.mp3.asset.json";

export const brand = {
  flower: flower.url,
  logo: logo.url,
  logoTeal: logoTeal.url,
  frame: frame.url,
  heroVideo: heroVideo.url,
  storeHero: storeHero.url,
  storefront: storefront.url,
  ambience: ambience.url,
  name: "HOMMAGE",
} as const;

export const contact = {
  addressLines: [
    "Balaji Sarovar Premier, Hotagi Rd",
    "Aasara Chowk, Model Colony, Majrewadi",
    "Solapur, Maharashtra 413004",
  ],
  hours: "Mon–Sat 10 AM – 10 PM · Sun 10 AM – 11 PM",
  phone: "+91-9370848246",
  phoneHref: "tel:+919370848246",
  email: "hellohommage@gmail.com",
  emailHref: "mailto:hellohommage@gmail.com",
  instagram: "https://www.instagram.com/hommageindia",
  instagramHandle: "@hommageindia",
  maps: "https://share.google/X5wcgIBxMt6KLSGRO",
} as const;

export const navigation = [
  { to: "/", label: "Home" },
  { href: "https://n0e34j-wq.myshopify.com/", label: "Shop" },
  { to: "/hampers", label: "Hampers" },
  { to: "/events", label: "Events" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "About" },
] as const;
