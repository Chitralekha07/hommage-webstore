import { createFileRoute, Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { LogoFormation } from "@/components/LogoFormation";
import { Reveal } from "@/components/Reveal";
import { StoreFilm } from "@/components/StoreFilm";
import { upcomingEvents } from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hommage — A Lifestyle Concept Store in Solapur" },
      {
        name: "description",
        content:
          "Hommage is an experiential lifestyle concept store in Solapur — handcrafted objects, hampers, workshops and events that rediscover the gems of bygone eras.",
      },
      { property: "og:title", content: "Hommage — A Lifestyle Concept Store in Solapur" },
      {
        property: "og:description",
        content: "Handcrafted objects, hampers and events that rediscover the gems of bygone eras.",
      },
    ],
  }),
  component: Home,
});

const categories = [
  { label: "Collection", to: "/shop" },
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
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
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

            <h2 className="mt-16 text-2xl leading-tight tracking-[0.14em] text-teal uppercase md:text-3xl">
              Rediscover gems of the bygone eras
            </h2>
            <p className="mt-6 max-w-xl text-base leading-loose text-foreground/75 md:text-lg">
              <span className="border-b border-gold text-teal">Hommage</span> is a tribute to
              tradition, culture and artists — a lifestyle concept store born from a love for
              craftsmanship and history. We serve Indian and world heritage on one platter through
              changing themes, cognate merchandise and experiences, taking you on a journey of
              handicrafts and art from different regions and times.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/events" className="btn-tactile">
                Our events
              </Link>
              <Link to="/contact" className="btn-tactile btn-tactile-solid">
                Visit the store
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <StoreFilm className="mx-auto w-full max-w-[26rem]" />
          </Reveal>
        </div>
      </section>

      <div className="gold-rule mx-auto max-w-[100rem]" />

      {/* Teasers */}
      <section className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">The House</p>
          <h2 className="mt-6 max-w-3xl text-3xl leading-tight text-teal md:text-5xl">
            A room first, and a collection second.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-3">
          {[
            {
              title: "Shop",
              to: "/shop" as const,
              copy: "Art, apparel, home decor and small editions — handcrafted, organic and sustainably sourced.",
            },
            {
              title: "Hampers",
              to: "/hampers" as const,
              copy: "Compositions for giving — sealed, layered and made to be opened without hurry.",
            },
            {
              title: "Events",
              to: "/events" as const,
              copy: "Workshops, live talks and pop-ups where the craft is placed directly into your hands.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <Link to={item.to} className="group block">
                <div className="gold-rule" />
                <h3 className="mt-6 text-2xl tracking-[0.12em] text-teal uppercase">{item.title}</h3>
                <p className="mt-4 text-sm leading-loose text-muted-foreground">{item.copy}</p>
                <span className="eyebrow mt-6 inline-block text-gold transition-transform duration-500 group-hover:translate-x-1">
                  Enter →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="woodgrain py-28">
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
            <Link to="/events" className="btn-tactile mt-12">
              All events
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
