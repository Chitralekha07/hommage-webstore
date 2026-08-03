import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Hommage" },
      {
        name: "description",
        content: "Notes from Hommage on artists, craft and the objects we live with.",
      },
      { property: "og:title", content: "Journal — Hommage" },
      { property: "og:description", content: "Notes from Hommage on artists and craft." },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <div className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
      <Reveal>
        <p className="eyebrow text-gold">Journal</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-teal md:text-6xl">
          Notes from the house
        </h1>
        <div className="gold-rule mt-12" />
      </Reveal>

      {journalPosts.length === 0 ? (
        <Reveal delay={100}>
          <p className="mt-16 max-w-xl text-sm leading-loose text-muted-foreground">
            The first entries are being written. Stay tuned.
          </p>
        </Reveal>
      ) : (
        <div className="mt-20 grid gap-14 md:grid-cols-2">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 120}>
              <Link to="/journal/$slug" params={{ slug: post.slug }} className="group block">
                <p className="eyebrow text-gold">
                  {post.category} · {post.date}
                </p>
                <h2 className="mt-3 text-2xl leading-snug text-teal">{post.title}</h2>
                <p className="mt-3 text-sm leading-loose text-muted-foreground">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
