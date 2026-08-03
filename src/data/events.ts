import { brand } from "@/lib/brand";
import workshopTable from "@/assets/event-workshop-table.jpg.asset.json";
import workshopHands from "@/assets/event-workshop-hands.jpg.asset.json";
import workshopGuests from "@/assets/event-workshop-guests.jpg.asset.json";
import mirrorMosaic from "@/assets/event-mirror-mosaic.jpg.asset.json";
import eventVideo1 from "@/assets/event-video-1.mp4.asset.json";
import eventVideo2 from "@/assets/event-video-2.mp4.asset.json";
import salon from "@/assets/event-salon.jpg";

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

export const pastEvents: HommageEvent[] = [
  {
    slug: "mirror-mosaic-workshop",
    title: "The Mirror Mosaic Workshop",
    date: "Recent, at the store",
    location: "Hommage, Balaji Sarovar Premier, Solapur",
    description:
      "An afternoon of hands at work. Guests sat around a long table with trays of cut mirror, tile nippers and grout, and slowly built their own mandala mosaic — each one setting the glass in a pattern of their own. The room filled with the sound of tapping and conversation, and everyone left carrying the piece they had made.",
    media: [
      { kind: "image", src: workshopTable.url, alt: "Guests around the workshop table setting mirror mosaic pieces" },
      { kind: "video", src: eventVideo1.url, poster: workshopHands.url, alt: "Film from the mirror mosaic workshop" },
      { kind: "image", src: workshopHands.url, alt: "Hands placing cut mirror into a mosaic mandala" },
      { kind: "video", src: eventVideo2.url, poster: workshopGuests.url, alt: "Second film from the mirror mosaic workshop" },
      { kind: "image", src: mirrorMosaic.url, alt: "A finished mirror mosaic mandala" },
      { kind: "image", src: workshopGuests.url, alt: "Guests with their finished mosaic artworks" },
    ],
  },
  {
    slug: "the-gardenia-salon",
    title: "The Gardenia Salon",
    date: "Earlier this season",
    location: "Hommage, Solapur",
    description:
      "An evening of slow looking. Guests moved between plinths of new objects while a florist worked live at the table, composing arrangements that were gifted at the door.",
    media: [
      { kind: "image", src: salon, alt: "Guests at the Gardenia Salon among candlelit florals" },
      { kind: "video", src: brand.heroVideo, poster: salon, alt: "Film from the Gardenia Salon" },
    ],
  },
];

export const upcomingEvents = [
  {
    title: "Block Print Table",
    date: "Coming soon",
    location: "Hommage, Solapur",
    note: "An afternoon with a printer in residence — carved blocks, natural dyes, and a length of cloth to take home.",
  },
  {
    title: "Live Talk: Gems of the Bygone Eras",
    date: "Coming soon",
    location: "Hommage, Solapur",
    note: "A conversation on vanishing crafts and the artisans keeping them alive, with objects passed around the room.",
  },
  {
    title: "Festive Hamper Preview",
    date: "Coming soon",
    location: "Hommage, Solapur",
    note: "First look at the season's hampers, composed in the store over an evening of tea and tasting.",
  },
];
