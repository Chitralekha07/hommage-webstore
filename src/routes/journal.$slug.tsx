import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl, paragraphs, type Post } from "@/lib/content";

export const Route = createFileRoute("/journal/$slug")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Journal entry — Hommage" },
      { name: "description", content: "An entry from the Hommage journal." },
      { property: "og:title", content: "Journal entry — Hommage" },
      { property: "og:description", content: "An entry from the Hommage journal." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: JournalPostPage,
});

function JournalPostPage() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", slug).maybeSingle();
      if (error) throw error;
      return (data as Post | null) ?? null;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl text-teal">Entry not found</h1>
        <Link to="/journal" className="eyebrow link-underline mt-8 inline-block text-gold">
          Back to the journal
        </Link>
      </div>
    );
  }

  const src = mediaUrl(data.media_url);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <Reveal>
          <p className="eyebrow text-gold">
            {data.event_date ?? new Date(data.created_at).toLocaleDateString()}
          </p>
          <h1 className="mt-6 text-4xl leading-tight text-teal md:text-5xl">{data.title}</h1>
        </Reveal>
      </div>

      {src && (
        <Reveal delay={80}>
          <div className="mt-16 w-full overflow-hidden">
            {data.media_type === "video" ? (
              <video src={src} controls playsInline className="h-auto w-full" />
            ) : (
              <img src={src} alt={data.title} className="h-auto w-full object-cover" />
            )}
          </div>
        </Reveal>
      )}

      <div className="mx-auto max-w-2xl px-6 py-20">
        {paragraphs(data.body).map((paragraph, i) => (
          <Reveal key={i} delay={i * 80}>
            <p className="mb-8 text-base leading-loose text-foreground/80 md:text-lg">{paragraph}</p>
          </Reveal>
        ))}
        <div className="gold-rule mt-12" />
        <Link to="/journal" className="eyebrow link-underline mt-10 inline-block text-teal">
          ← All entries
        </Link>
      </div>
    </article>
  );
}
