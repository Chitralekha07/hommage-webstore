import flower from "@/assets/hommage-flower.webp";
import logo from "@/assets/hommage-logo.webp";
import logoTeal from "@/assets/hommage-logo-teal.webp";
import frame from "@/assets/hommage-frame.webp";
import heroVideo from "@/assets/hommage-hero.mp4";
import storeHero from "@/assets/store-hero.mp4";
import storefront from "@/assets/storefront.jpg";
import ambience from "@/assets/hommage-ambience.mp3";

export const brand = {
  flower,
  logo,
  logoTeal,
  frame,
  heroVideo,
  storeHero,
  storefront,
  ambience,
  name: "HOMMAGE",
} as const;

export const shopUrl = "https://n0e34j-wq.myshopify.com/" as const;

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
  { href: shopUrl, label: "Shop" },
  { to: "/hampers", label: "Hampers" },
  { to: "/events", label: "Events" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "About" },
] as const;
