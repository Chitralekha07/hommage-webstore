import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MediaGallery } from "@/components/MediaGallery";
import { latestEvent, pastEvents } from "@/data/events";

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

function EventsPage() {
  const [openPrevious, setOpenPrevious] = useState(false);

  return (
    <div className="mx-auto max-w-[100rem] px-6 pt-28 pb-28 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow text-gold">Latest event</p>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <h1 className="text-3xl leading-tight text-teal md:text-5xl">{latestEvent.title}</h1>
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {latestEvent.location}
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-loose text-foreground/75 md:text-base">
              {latestEvent.description}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14">
              <MediaGallery media={latestEvent.media} />
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
                  {pastEvents.length === 0 ? (
                    <p className="text-sm leading-loose text-muted-foreground">
                      No previous events archived yet.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gold/20">
                      {pastEvents.map((event) => (
                        <li key={event.slug} className="py-5">
                          <p className="eyebrow text-gold">{event.date}</p>
                          <h2 className="mt-2 text-xl text-teal">{event.title}</h2>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {event.description}
                          </p>
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
