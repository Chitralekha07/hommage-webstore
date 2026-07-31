import salon from "@/assets/event-salon.jpg";
import ballroom from "@/assets/event-ballroom.jpg";
import hamper from "@/assets/event-hamper.jpg";
import { brand } from "@/lib/brand";

export type EventMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string; alt: string };

export type HommageEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  media: EventMedia[];
};

/** Placeholder events — replace media and copy as real event assets arrive. */
export const pastEvents: HommageEvent[] = [
  {
    slug: "the-gardenia-salon",
    title: "The Gardenia Salon",
    date: "March 2026",
    location: "Hommage Atelier, Mumbai",
    description:
      "An evening of slow looking. Guests moved between plinths of new objects while a florist worked live at the marble table, composing gardenia and blossom arrangements that were gifted at the door.",
    media: [
      { kind: "image", src: salon, alt: "Guests at the Gardenia Salon among candlelit florals" },
      { kind: "video", src: brand.heroVideo, poster: salon, alt: "Film from the Gardenia Salon" },
      { kind: "image", src: hamper, alt: "Hamper gifted to guests at the Gardenia Salon" },
    ],
  },
  {
    slug: "an-evening-in-the-ballroom",
    title: "An Evening in the Ballroom",
    date: "December 2025",
    location: "Heritage hotel residency",
    description:
      "Our first hotel residency. A ballroom of arched windows was reset as a quiet showcase — brass plinths, teal drapery, and a menu built around the season's hampers.",
    media: [
      { kind: "image", src: ballroom, alt: "Ballroom set with brass plinths for the Hommage residency" },
      { kind: "image", src: salon, alt: "Detail of the residency salon" },
    ],
  },
];

export const upcomingEvents = [
  {
    title: "The Summer Table",
    date: "July 2026",
    location: "Hommage Atelier",
    note: "A seated dinner and hamper preview for collectors and collaborators. Invitations released in June.",
  },
  {
    title: "Hommage at Sea House",
    date: "September 2026",
    location: "Coastal hotel residency",
    note: "A two-week residency of objects, florals and evening rituals inside a heritage seafront property.",
  },
  {
    title: "Winter Atelier Week",
    date: "November 2026",
    location: "Hommage Atelier",
    note: "Seven days of makers in residence, gift composition sessions and private appointments.",
  },
];
