import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { enquirySchema, enquiryTypes, type EnquiryInput } from "@/lib/enquiry-schema";
import { brand, contact } from "@/lib/brand";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "About & Enquiries — Hommage" },
      {
        name: "description",
        content:
          "About Hommage, and enquiries from vendors, collaborators, event artists and hotel groups who would like Hommage at their property.",
      },
      { property: "og:title", content: "About & Enquiries — Hommage" },
      {
        property: "og:description",
        content: "Partner with Hommage — vendors, collaborators, event artists and hospitality groups.",
      },
    ],
  }),
  component: ContactPage,
});

const empty: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  enquiryType: "other",
  location: "",
  message: "",
};

function ContactPage() {
  const send = useServerFn(submitEnquiry);
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof EnquiryInput, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }) as EnquiryInput);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields");
      return;
    }

    setErrors({});
    setPending(true);
    try {
      const result = await send({ data: parsed.data });
      if (result.ok) {
        toast.success("Thank you — your enquiry has reached the house.");
        setValues(empty);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const fieldClass =
    "mt-3 h-12 rounded-none border-0 border-b border-gold/40 bg-transparent px-0 focus-visible:border-teal focus-visible:ring-0";

  return (
    <div>
      <section className="mx-auto max-w-[100rem] px-6 pt-16 pb-24 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">About</p>
            <h1 className="mt-6 text-4xl leading-tight text-teal md:text-6xl">
              The concept tradition store.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-loose text-foreground/75 md:text-lg">
              Hommage began as a room rather than a range — a tribute to tradition, culture and the
              artists who keep our crafts alive. Objects are arranged with the patience of a maker,
              hampers layered for slow opening, and evenings hosted with the manners of a good host.
              Our work travels: into hotels, heritage properties and private residencies.
            </p>

            <div className="gold-rule mt-12 max-w-md" />

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-gold">Visit</dt>
                <dd className="mt-3 text-sm leading-relaxed text-foreground/75">
                  <a href={contact.maps} target="_blank" rel="noreferrer" className="link-underline">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-gold">Hours</dt>
                <dd className="mt-3 text-sm text-foreground/75">{contact.hours}</dd>
              </div>
              <div>
                <dt className="eyebrow text-gold">Speak to us</dt>
                <dd className="mt-3 space-y-1 text-sm text-foreground/75">
                  <a href={contact.phoneHref} className="link-underline block">
                    {contact.phone}
                  </a>
                  <a href={contact.emailHref} className="link-underline block">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-gold">Follow</dt>
                <dd className="mt-3 text-sm text-foreground/75">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    {contact.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={contact.maps} target="_blank" rel="noreferrer" className="btn-tactile">
                Get directions
              </a>
              <a href={contact.phoneHref} className="btn-tactile btn-tactile-solid">
                Call the store
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/25">
              <img
                src={brand.storefront}
                alt="The Hommage storefront in Solapur, with etched glass doors and draped display windows"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>


      <section className="bg-ivory-deep/40 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="eyebrow text-gold">Enquiries</p>
            <h2 className="mt-6 text-3xl text-teal md:text-4xl">Write to the house</h2>
            <p className="mt-6 max-w-2xl text-sm leading-loose text-muted-foreground">
              We welcome enquiries from vendors and makers, collaborators, event artists, and hotel
              groups or property owners who would like Hommage to take residence with them. Tell us
              a little about what you have in mind.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={onSubmit} noValidate className="mt-14 grid gap-8 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="eyebrow text-teal">
                  Name
                </Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={fieldClass}
                  maxLength={100}
                />
                {errors["name"] && <p className="mt-2 text-xs text-destructive">{errors["name"]}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="eyebrow text-teal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={fieldClass}
                  maxLength={255}
                />
                {errors["email"] && <p className="mt-2 text-xs text-destructive">{errors["email"]}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="eyebrow text-teal">
                  Phone (optional)
                </Label>
                <Input
                  id="phone"
                  value={values.phone ?? ""}
                  onChange={(e) => set("phone", e.target.value)}
                  className={fieldClass}
                  maxLength={40}
                />
              </div>

              <div>
                <Label htmlFor="organisation" className="eyebrow text-teal">
                  Organisation (optional)
                </Label>
                <Input
                  id="organisation"
                  value={values.organisation ?? ""}
                  onChange={(e) => set("organisation", e.target.value)}
                  className={fieldClass}
                  maxLength={150}
                />
              </div>

              <div>
                <Label htmlFor="enquiryType" className="eyebrow text-teal">
                  Nature of enquiry
                </Label>
                <select
                  id="enquiryType"
                  value={values.enquiryType}
                  onChange={(e) => set("enquiryType", e.target.value)}
                  className="mt-3 h-12 w-full border-0 border-b border-gold/40 bg-transparent text-sm text-foreground focus:border-teal focus:outline-none"
                >
                  {enquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="location" className="eyebrow text-teal">
                  City / property (optional)
                </Label>
                <Input
                  id="location"
                  value={values.location ?? ""}
                  onChange={(e) => set("location", e.target.value)}
                  className={fieldClass}
                  maxLength={120}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="message" className="eyebrow text-teal">
                  Your enquiry
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  maxLength={2000}
                  className="mt-3 rounded-none border-0 border-b border-gold/40 bg-transparent px-0 focus-visible:border-teal focus-visible:ring-0"
                />
                {errors["message"] && (
                  <p className="mt-2 text-xs text-destructive">{errors["message"]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="eyebrow border border-teal px-10 py-4 text-teal transition-colors duration-500 hover:bg-teal hover:text-primary-foreground disabled:opacity-50"
                >
                  {pending ? "Sending…" : "Send enquiry"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
