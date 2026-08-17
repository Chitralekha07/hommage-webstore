import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/hampers")({
  head: () => ({
    meta: [
      { title: "Hampers — Hommage" },
      {
        name: "description",
        content:
          "Tell us the occasion and your budget, and Hommage will compose a hamper made to be opened slowly.",
      },
      { property: "og:title", content: "Hampers — Hommage" },
      { property: "og:description", content: "Bespoke gift hampers composed by the Hommage atelier." },
    ],
  }),
  component: HampersPage,
});

const HAMPER_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxdNdN9sVfiYe5x289hF-4kL4sAKtZAkjH-IfGhJTdhiWayjZ7bOjPZ2fYwxqdks3I/exec";

const occasions = [
  "Wedding",
  "Diwali",
  "Corporate gifting",
  "Birthday",
  "Anniversary",
  "Housewarming",
  "Custom occasion",
] as const;

function HampersPage() {
  const [occasion, setOccasion] = useState("");
  const [customOccasion, setCustomOccasion] = useState("");
  const [priceLimit, setPriceLimit] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const isCustom = occasion === "Custom occasion";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!occasion) {
      setError("Please choose an occasion.");
      return;
    }
    if (isCustom && !customOccasion.trim()) {
      setError("Please describe the occasion.");
      return;
    }
    const amount = Number(priceLimit);
    if (!priceLimit.trim() || Number.isNaN(amount) || amount <= 0) {
      setError("Please enter a valid price limit.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setError("Please enter your phone number.");
      return;
    }
    if (trimmedPhone.replace(/[^0-9]/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setPending(true);
    try {
      await fetch(HAMPER_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          occasion: isCustom ? customOccasion.trim().slice(0, 200) : occasion,
          customOccasion: isCustom ? customOccasion.trim().slice(0, 200) : "",
          priceLimit: amount,
          name: name.trim().slice(0, 100),
          phone: trimmedPhone.slice(0, 30),
          submittedAt: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[100rem] px-6 py-28 md:px-12">
      <Reveal>
        <p className="eyebrow text-gold">Hampers</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-teal md:text-6xl">
          Composed for the occasion
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-loose text-foreground/75 md:text-base">
          Tell us what you are marking and what you would like to spend. We will compose a hamper
          and write back with the arrangement.
        </p>
        <div className="gold-rule mt-12" />
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-14 max-w-xl">
          {sent ? (
            <div className="border border-gold/30 px-8 py-12 text-center">
              <p className="eyebrow text-gold">Thank you</p>
              <h2 className="mt-5 text-2xl text-teal">Your hamper request is with us.</h2>
              <p className="mt-4 text-sm leading-loose text-muted-foreground">
                We will be in touch shortly with a composition for your occasion.
              </p>
              <button
                type="button"
                className="btn-tactile mt-8"
                onClick={() => {
                  setSent(false);
                  setOccasion("");
                  setCustomOccasion("");
                  setPriceLimit("");
                  setName("");
                  setPhone("");
                }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-7">
              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <select
                  id="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="h-11 w-full border border-gold/30 bg-transparent px-3 text-sm text-foreground transition-colors focus:border-teal focus:outline-none"
                >
                  <option value="">Select an occasion</option>
                  {occasions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {isCustom && (
                <div className="space-y-2">
                  <Label htmlFor="customOccasion">Tell us the occasion</Label>
                  <Input
                    id="customOccasion"
                    maxLength={200}
                    value={customOccasion}
                    onChange={(e) => setCustomOccasion(e.target.value)}
                    placeholder="A retirement dinner, a temple ceremony…"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="priceLimit">Price limit (₹)</Label>
                <Input
                  id="priceLimit"
                  type="number"
                  min={1}
                  max={10000000}
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(e.target.value)}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Name{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (we will contact you with the details)
                  </span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  maxLength={100}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone number{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (we will contact you with the details)
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  maxLength={30}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 "
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button type="submit" disabled={pending} className="btn-tactile btn-tactile-solid">
                {pending ? "Sending…" : "Request a hamper"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
