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

/** Real entries will be added here. Intentionally empty for now. */
export const journalPosts: JournalPost[] = [];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
