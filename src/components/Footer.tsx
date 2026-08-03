import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { brand, contact, navigation } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="woodgrain mt-32 border-t border-gold/25">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr_1fr] md:px-12">
        <div>
          <img src={brand.logoTeal} alt="Hommage" className="h-20 w-auto object-contain" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A lifestyle concept store in Solapur — a tribute to tradition, culture and the artisans
            keeping our crafts alive.
          </p>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn-tactile mt-8"
          >
            <Instagram className="h-4 w-4" />
            {contact.instagramHandle}
          </a>
        </div>

        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-underline text-sm text-foreground/75">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Visit & Enquire</p>
          <ul className="mt-6 space-y-4 text-sm text-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
              <a href={contact.maps} target="_blank" rel="noreferrer" className="link-underline leading-relaxed">
                {contact.addressLines.join(", ")}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="h-4 w-4 shrink-0 text-copper" />
              {contact.hours}
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-copper" />
              <a href={contact.phoneHref} className="link-underline">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-copper" />
              <a href={contact.emailHref} className="link-underline">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="px-6 py-8 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase md:px-12">
        © {new Date().getFullYear()} Hommage · Solapur
      </p>
    </footer>
  );
}
