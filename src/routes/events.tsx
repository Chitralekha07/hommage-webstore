import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MediaGallery } from "@/components/MediaGallery";
import { latestEvent } from "@/data/events";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl, paragraphs, type Post } from "@/lib/content";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Hommage" },
      {
        name: "description",
        content:
          "Workshops and gatherings at Hommage, Solapur — films and images from the latest event, and news of what is coming.",
      },
      { property: "og:title", content: "Events — Hommage" },
      {
        property: "og:description",
        content: "Films and images from the latest Hommage workshop, and upcoming announcements.",
      },
    ],
  }),
  component: EventsPage,
});

function PostMedia({ post }: { post: Post }) {
  const src = mediaUrl(post.media_url);
  if (!src) return null;
  return (
    <div className="overflow-hidden border border-gold/25">
      {post.media_type === "video" ? (
        <video src={src} controls playsInline className="h-auto w-full" />
      ) : (
        <img src={src} alt={post.title} loading="lazy" className="h-auto w-full object-cover" />
      )}
    </div>
  );
}

function EventsPage() {
  const [openPrevious, setOpenPrevious] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ["posts", "event"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("section", "event")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });

  const [featured, ...previousPosts] = posts;

  return (
    <div className="mx-auto max-w-[100rem] px-6 pt-28 pb-28 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow text-gold">Latest event</p>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <h1 className="text-3xl leading-tight text-teal md:text-5xl">
                {featured ? featured.title : latestEvent.title}
              </h1>
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {featured ? (featured.location ?? "") : latestEvent.location}
              </span>
            </div>
            {featured ? (
              <div className="mt-6 max-w-2xl space-y-5 text-sm leading-loose text-foreground/75 md:text-base">
                {paragraphs(featured.body).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="mt-6 max-w-2xl text-sm leading-loose text-foreground/75 md:text-base">
                {latestEvent.description}
              </p>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14">
              {featured ? <PostMedia post={featured} /> : <MediaGallery media={latestEvent.media} />}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-20">
              <button
                type="button"
                onClick={() => setOpenPrevious((v) => !v)}
                aria-expanded={openPrevious}
                className="btn-tactile inline-flex items-center gap-3"
              >
                Previous events
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-500 ${openPrevious ? "rotate-180" : ""}`}
                />
              </button>

              {openPrevious && (
                <div className="mt-6 border border-gold/25 px-6 py-8">
                  {previousPosts.length === 0 ? (
                    <p className="text-sm leading-loose text-muted-foreground">
                      No previous events archived yet.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gold/20">
                      {previousPosts.map((post) => (
                        <li key={post.id} className="py-7">
                          <p className="eyebrow text-gold">
                            {post.event_date ?? new Date(post.created_at).toLocaleDateString()}
                          </p>
                          <h2 className="mt-2 text-xl text-teal">{post.title}</h2>
                          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                            {paragraphs(post.body).map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                          <div className="mt-5">
                            <PostMedia post={post} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <aside className="border border-gold/25 bg-ivory-deep/40 px-7 py-8 lg:sticky lg:top-32">
            <p className="eyebrow text-gold">Upcoming</p>
            <div className="gold-rule mt-5" />
            <p className="mt-6 text-sm leading-loose text-foreground/75">
              Hommage will host soon. Stay tuned!
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
