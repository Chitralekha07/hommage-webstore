import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl, type Post } from "@/lib/content";

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
  const { data: posts = [] } = useQuery({
    queryKey: ["posts", "journal"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("section", "journal")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });

  const hasContent = posts.length > 0 || journalPosts.length > 0;

  return (
    <div className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
      <Reveal>
        <p className="eyebrow text-gold">Journal</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-teal md:text-6xl">
          Notes from the house
        </h1>
        <div className="gold-rule mt-12" />
      </Reveal>

      {!hasContent ? (
        <Reveal delay={100}>
          <p className="mt-16 max-w-xl text-sm leading-loose text-muted-foreground">
            The first entries are being written. Stay tuned.
          </p>
        </Reveal>
      ) : (
        <div className="mt-20 grid gap-14 md:grid-cols-2">
          {posts.map((post, i) => {
            const src = mediaUrl(post.media_url);
            return (
              <Reveal key={post.id} delay={i * 100}>
                <Link to="/journal/$slug" params={{ slug: post.id }} className="group block">
                  {src && (
                    <div className="mb-5 overflow-hidden border border-gold/20">
                      {post.media_type === "video" ? (
                        <video src={src} muted loop playsInline autoPlay className="aspect-[4/3] w-full object-cover" />
                      ) : (
                        <img
                          src={src}
                          alt={post.title}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                  )}
                  <p className="eyebrow text-gold">
                    {post.event_date ?? new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <h2 className="mt-3 text-2xl leading-snug text-teal">{post.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-loose text-muted-foreground">
                    {post.body}
                  </p>
                </Link>
              </Reveal>
            );
          })}

          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(posts.length + i) * 100}>
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
