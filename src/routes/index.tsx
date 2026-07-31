import { createFileRoute, Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { LogoFormation } from "@/components/LogoFormation";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";
import { upcomingEvents } from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hommage — Experiential Retail House" },
      {
        name: "description",
        content:
          "Hommage is an experiential retail house of considered objects, hampers and gatherings. Summer 2026 collection now in the atelier.",
      },
      { property: "og:title", content: "Hommage — Experiential Retail House" },
      {
        property: "og:description",
        content: "Considered objects, hampers and gatherings from the Hommage atelier.",
      },
    ],
  }),
  component: Home,
});

const categories = [
  { label: "Ready-to-wear", to: "/shop" },
  { label: "Objects", to: "/shop" },
  { label: "Hampers", to: "/hampers" },
  { label: "Events", to: "/events" },
  { label: "Journal", to: "/journal" },
] as const;

function Home() {
  return (
    <div>
      <LogoFormation />

      {/* Hero */}
      <section className="mx-auto max-w-[100rem] px-6 pb-24 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <h1 className="flex items-center text-teal">
              <span className="wordmark text-[clamp(1.6rem,5vw,3.25rem)]">H</span>
              <img
                src={brand.flower}
                alt=""
                aria-hidden="true"
                className="mx-[0.08em] h-[clamp(2.4rem,7vw,4.6rem)] w-[clamp(2.4rem,7vw,4.6rem)] object-contain"
              />
              <span className="wordmark text-[clamp(1.6rem,5vw,3.25rem)]">MMAGE</span>
              <span className="sr-only">Hommage</span>
            </h1>

            <ul className="mt-12 space-y-4">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="link-underline text-lg font-light text-foreground/80 md:text-xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 text-2xl tracking-[0.18em] text-teal uppercase md:text-3xl">
              Summer 2026
            </h2>
            <p className="mt-6 max-w-xl text-base leading-loose text-foreground/75 md:text-lg">
              <span className="border-b border-gold text-teal">"The Bright Young"</span> draws on
              the rituals of hosting — reframing the gift, the table and the storefront as one
              continuous gesture. Pieces of the collection are composed from slow materials:
              hand-thrown porcelain, waxed linen, preserved bloom and antique brass, gathered and
              rewoven for the season.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/25">
              <video
                src={brand.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Hommage Summer 2026 film"
                className="h-[62vh] w-full object-cover md:h-[78vh]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="gold-rule mx-auto max-w-[100rem]" />

      {/* Teasers */}
      <section className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">The House</p>
          <h2 className="mt-6 max-w-3xl text-3xl leading-tight text-teal md:text-5xl">
            A retail house built as a room first, and a collection second.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-3">
          {[
            {
              title: "Shop",
              to: "/shop" as const,
              copy: "Objects, ready-to-wear and small editions, released slowly through the year.",
            },
            {
              title: "Hampers",
              to: "/hampers" as const,
              copy: "Compositions for giving — sealed, layered and made to be opened without hurry.",
            },
            {
              title: "Events",
              to: "/events" as const,
              copy: "Salons, dinners and hotel residencies where the collection is lived in for a night.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <Link to={item.to} className="group block">
                <div className="gold-rule" />
                <h3 className="mt-6 text-2xl tracking-[0.12em] text-teal uppercase">{item.title}</h3>
                <p className="mt-4 text-sm leading-loose text-muted-foreground">{item.copy}</p>
                <span className="eyebrow mt-6 inline-block text-gold">Enter →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-ivory-deep/40 py-28">
        <div className="mx-auto max-w-[100rem] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-gold">In the Diary</p>
          </Reveal>
          <ul className="mt-12 divide-y divide-gold/20 border-y border-gold/20">
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
          <Reveal>
            <Link to="/events" className="eyebrow link-underline mt-10 inline-block text-teal">
              All events
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">Journal</p>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {journalPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 110}>
              <Link to="/journal/$slug" params={{ slug: post.slug }} className="group block">
                <div className="aspect-[4/3] overflow-hidden border border-gold/20">
                  <img
                    src={post.cover}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-6 text-gold">{post.category}</p>
                <h3 className="mt-3 text-xl leading-snug text-teal">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
