import { Link } from "@tanstack/react-router";
import { brand, navigation } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-gold/25 bg-ivory-deep/40">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr_1fr] md:px-12">
        <div>
          <div className="flex items-center gap-3">
            <img src={brand.flower} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
            <span className="wordmark text-base text-teal">Hommage</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An experiential retail house — objects, hampers and gatherings composed with
            the patience of a maker and the manners of a host.
          </p>
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
          <p className="eyebrow text-gold">Enquiries</p>
          <ul className="mt-6 space-y-3 text-sm text-foreground/75">
            <li>hello@hommage.example</li>
            <li>Partnerships & hospitality</li>
            <li>Press & collaborations</li>
          </ul>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="px-6 py-8 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase md:px-12">
        © {new Date().getFullYear()} Hommage
      </p>
    </footer>
  );
}
