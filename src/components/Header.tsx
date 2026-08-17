import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { brand, contact, navigation } from "@/lib/brand";
import { useRouterState } from "@tanstack/react-router";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "frosted border-b border-gold/20 py-2" : "py-4"
      }`}
    >
      <div className="mx-auto grid max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 md:px-12">
        <Link to="/" className="press flex min-w-0 items-center" aria-label="HOMMAGE home">
          <img
            src={brand.logo}
            alt="Hommage"
            className={`w-auto object-contain transition-all duration-700 ${
              scrolled ? "h-14 md:h-16" : "h-20 md:h-28"
            }`}
          />

        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) =>
            "href" in item ? (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow link-underline text-foreground/80 transition-colors hover:text-teal"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="eyebrow link-underline text-foreground/80 transition-colors hover:text-teal"
                activeProps={{ className: "text-teal" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Hommage on Instagram"
            className="press text-teal"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="press justify-self-end text-teal lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="frosted mt-3 border-t border-gold/20 px-6 py-6 lg:hidden">
            <ul className="flex flex-col gap-5">
            {navigation.map((item) =>
              "href" in item ? (
                <li key={item.href}>
                  <a href={item.href} className="eyebrow text-foreground/80">
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.to}>
                  <Link to={item.to} className="eyebrow text-foreground/80" activeProps={{ className: "text-teal" }}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="eyebrow text-foreground/80"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
