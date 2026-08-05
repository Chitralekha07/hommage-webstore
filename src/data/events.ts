import workshopTable from "@/assets/event-workshop-table.jpg.asset.json";
import workshopHands from "@/assets/event-workshop-hands.jpg.asset.json";
import workshopGuests from "@/assets/event-workshop-guests.jpg.asset.json";
import eventVideo1 from "@/assets/event-video-1.mp4.asset.json";
import eventVideo2 from "@/assets/event-video-2.mp4.asset.json";

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

export const latestEvent: HommageEvent = {
  slug: "mirror-mosaic-workshop",
  title: "Gujarat: Lippan Art Workshop",
  date: "Recent, at the store",
  location: "Hommage, Balaji Sarovar Premier, Solapur",
  description:
    "An afternoon of hands at work. Guests sat around a long table with trays of cut mirror, tile nippers and grout, and slowly built their own mandala mosaic — each one setting the glass in a pattern of their own. Everyone left carrying the piece they had made.",
  media: [
    { kind: "image", src: workshopTable.url, alt: "Guests around the workshop table setting mirror mosaic pieces" },
    { kind: "video", src: eventVideo1.url, poster: workshopHands.url, alt: "Film from the mirror mosaic workshop" },
    { kind: "image", src: workshopHands.url, alt: "Hands placing cut mirror into a mosaic mandala" },
    { kind: "video", src: eventVideo2.url, poster: workshopGuests.url, alt: "Second film from the mirror mosaic workshop" },
    { kind: "image", src: workshopGuests.url, alt: "Guests with their finished mosaic artworks" },
  ],
};

/** Earlier events will be listed here as the archive grows. */
export const pastEvents: HommageEvent[] = [];

/** Upcoming announcements. Empty until the next gathering is confirmed. */
export const upcomingEvents: { title: string; date: string; location: string; note: string }[] = [];
