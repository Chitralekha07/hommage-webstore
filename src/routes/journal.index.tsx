import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Hommage" },
      {
        name: "description",
        content: "Essays and house notes from Hommage on craft, hosting and the objects we live with.",
      },
      { property: "og:title", content: "Journal — Hommage" },
      { property: "og:description", content: "Essays and house notes from the Hommage atelier." },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const [lead, ...rest] = journalPosts;

  return (
    <div className="mx-auto max-w-[100rem] px-6 py-20 md:px-12">
      <Reveal>
        <p className="eyebrow text-gold">Journal</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-teal md:text-6xl">
          Notes from the house
        </h1>
        <div className="gold-rule mt-12" />
      </Reveal>

      {lead && (
        <Reveal delay={100}>
          <Link
            to="/journal/$slug"
            params={{ slug: lead.slug }}
            className="group mt-16 grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div className="aspect-[16/10] overflow-hidden border border-gold/20">
              <img
                src={lead.cover}
                alt={lead.coverAlt}
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow text-gold">
                {lead.category} · {lead.date}
              </p>
              <h2 className="mt-5 text-3xl leading-snug text-teal md:text-4xl">{lead.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-loose text-muted-foreground">
                {lead.excerpt}
              </p>
              <span className="eyebrow mt-8 inline-block text-teal">Read — {lead.readingTime}</span>
            </div>
          </Link>
        </Reveal>
      )}

      <div className="mt-28 grid gap-14 md:grid-cols-2">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 120}>
            <Link to="/journal/$slug" params={{ slug: post.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden border border-gold/20">
                <img
                  src={post.cover}
                  alt={post.coverAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6 text-gold">
                {post.category} · {post.date}
              </p>
              <h2 className="mt-3 text-2xl leading-snug text-teal">{post.title}</h2>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">{post.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
