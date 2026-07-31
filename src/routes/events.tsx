import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { MediaGallery } from "@/components/MediaGallery";
import { pastEvents, upcomingEvents } from "@/data/events";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Hommage" },
      {
        name: "description",
        content:
          "Salons, dinners and hotel residencies by Hommage — films, images and news of upcoming gatherings.",
      },
      { property: "og:title", content: "Events — Hommage" },
      {
        property: "og:description",
        content: "Films and images from Hommage salons, dinners and hotel residencies.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div>
      {/* Full-frame opening film */}
      <section className="relative h-[70vh] w-full overflow-hidden md:h-[86vh]">
        <video
          src={brand.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-label="Film from a Hommage gathering"
        />
        <div className="absolute inset-0 bg-teal-deep/25" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <p className="eyebrow text-ivory/80">Events</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-ivory md:text-6xl">
            Rooms that are lived in for one night.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[100rem] px-6 py-24 md:px-12">
        <Reveal>
          <p className="max-w-3xl text-base leading-loose text-foreground/75 md:text-lg">
            Hommage builds temporary rooms — salons in the atelier, seated dinners, and residencies
            inside hotels and heritage properties. Each is documented in film and photograph, and
            each begins with the same question: how should a person feel three steps past the door?
          </p>
        </Reveal>
      </section>

      {/* Past events */}
      {pastEvents.map((event) => (
        <section key={event.slug} className="mx-auto max-w-[100rem] px-6 pb-28 md:px-12">
          <Reveal>
            <div className="gold-rule" />
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="min-w-0">
                <p className="eyebrow text-gold">{event.date}</p>
                <h2 className="mt-4 text-3xl text-teal md:text-4xl">{event.title}</h2>
              </div>
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {event.location}
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-loose text-foreground/75 md:text-base">
              {event.description}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <MediaGallery media={event.media} />
            </div>
          </Reveal>
        </section>
      ))}

      {/* Upcoming */}
      <section className="bg-ivory-deep/40 py-28">
        <div className="mx-auto max-w-[100rem] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-gold">News & Upcoming</p>
            <h2 className="mt-6 text-3xl text-teal md:text-4xl">What is being prepared</h2>
          </Reveal>
          <ul className="mt-14 divide-y divide-gold/20 border-y border-gold/20">
            {upcomingEvents.map((event, i) => (
              <Reveal as="li" key={event.title} delay={i * 90}>
                <div className="grid gap-3 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8">
                  <span className="eyebrow text-teal">{event.date}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl text-teal">{event.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.note}</p>
                  </div>
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">
                    {event.location}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
