import { brand } from "@/lib/brand";

export function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 py-24 text-center">
      <div>
        <img
          src={brand.flower}
          alt=""
          aria-hidden="true"
          className="mx-auto h-20 w-20 object-contain opacity-80"
        />
        <h1 className="mt-10 text-3xl tracking-[0.2em] text-teal uppercase md:text-4xl">{title}</h1>
        <div className="gold-rule mx-auto mt-8 w-40" />
        <p className="mt-8 text-sm leading-loose text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}
