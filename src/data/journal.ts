import journalHands from "@/assets/journal-hands.jpg";
import salon from "@/assets/event-salon.jpg";
import hamper from "@/assets/event-hamper.jpg";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  cover: string;
  coverAlt: string;
  body: string[];
};

/** Placeholder editorial — replace copy and imagery with real journal entries. */
export const journalPosts: JournalPost[] = [
  {
    slug: "the-manners-of-a-host",
    title: "The Manners of a Host",
    excerpt:
      "Why we build rooms before we build collections, and what hospitality teaches us about objects.",
    date: "12 June 2026",
    readingTime: "5 min",
    category: "House Notes",
    cover: journalHands,
    coverAlt: "Hands arranging gardenia blooms beside gold-rimmed porcelain",
    body: [
      "A shop is a room before it is a business. Long before the first object arrives, we ask how a person should feel three steps past the threshold — whether the light is low enough to slow them down, whether there is somewhere to put down a bag, whether anyone has thought about the sound of the floor.",
      "Hospitality is the discipline underneath everything we make. It is the reason our hampers are packed to be opened slowly, and the reason our events are always seated at some point in the evening.",
      "This is placeholder copy. Replace it with the first real entry from the house journal.",
    ],
  },
  {
    slug: "on-composing-a-hamper",
    title: "On Composing a Hamper",
    excerpt:
      "Weight, scent, and sequence — the three things we consider before a single object is placed.",
    date: "28 May 2026",
    readingTime: "4 min",
    category: "Craft",
    cover: hamper,
    coverAlt: "Artisanal hamper lined in teal silk with a gold wax seal",
    body: [
      "A hamper is a small piece of choreography. The first thing a person touches should be soft; the last should be the thing they keep.",
      "We work backwards from the moment of opening — the release of the seal, the first breath of scent, the order in which each layer is revealed.",
      "This is placeholder copy. Replace it with the real essay.",
    ],
  },
  {
    slug: "a-room-that-remembers",
    title: "A Room That Remembers",
    excerpt: "Notes from the Gardenia Salon, and what stays behind after the guests have gone.",
    date: "9 April 2026",
    readingTime: "6 min",
    category: "Events",
    cover: salon,
    coverAlt: "Candlelit salon with florals on a marble table",
    body: [
      "The morning after an event is the most honest hour in the house. Candles are low, the florals have opened fully, and the room finally shows what it was built to do.",
      "We photograph that hour every time. It has become our record of what worked.",
      "This is placeholder copy. Replace it with the real reflection.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
