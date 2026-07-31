import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { getJournalPost, journalPosts } from "@/data/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getJournalPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Entry unavailable — Hommage" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Hommage Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} — Hommage Journal` },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: JournalPostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl text-teal">Entry not found</h1>
      <Link to="/journal" className="eyebrow link-underline mt-8 inline-block text-gold">
        Back to the journal
      </Link>
    </div>
  );
}

function JournalPostPage() {
  const { post } = Route.useLoaderData();
  const others = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <Reveal>
          <p className="eyebrow text-gold">
            {post.category} · {post.date} · {post.readingTime}
          </p>
          <h1 className="mt-6 text-4xl leading-tight text-teal md:text-5xl">{post.title}</h1>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="mt-16 h-[55vh] w-full overflow-hidden md:h-[75vh]">
          <img src={post.cover} alt={post.coverAlt} className="h-full w-full object-cover" />
        </div>
      </Reveal>

      <div className="mx-auto max-w-2xl px-6 py-20">
        {post.body.map((paragraph: string, i: number) => (
          <Reveal key={i} delay={i * 80}>
            <p className="mb-8 text-base leading-loose text-foreground/80 md:text-lg">{paragraph}</p>
          </Reveal>
        ))}
        <div className="gold-rule mt-12" />
        <Link to="/journal" className="eyebrow link-underline mt-10 inline-block text-teal">
          ← All entries
        </Link>
      </div>

      <section className="mx-auto max-w-[100rem] px-6 pb-28 md:px-12">
        <p className="eyebrow text-gold">Continue reading</p>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.slug}
              to="/journal/$slug"
              params={{ slug: other.slug }}
              className="group block"
            >
              <div className="aspect-[16/10] overflow-hidden border border-gold/20">
                <img
                  src={other.cover}
                  alt={other.coverAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-xl text-teal">{other.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
