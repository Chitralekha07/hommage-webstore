import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navigation } from "@/lib/brand";

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
        scrolled ? "frosted border-b border-gold/20 py-3" : "py-6"
      }`}
    >
      <div className="mx-auto grid max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 md:px-12">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="HOMMAGE home">
          <img src={brand.flower} alt="" aria-hidden="true" className="h-8 w-8 shrink-0 object-contain" />
          <span className="wordmark truncate text-sm text-teal sm:text-base">Hommage</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow link-underline text-foreground/80 transition-colors hover:text-teal"
              activeProps={{ className: "text-teal" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="justify-self-end text-teal lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="frosted mt-3 border-t border-gold/20 px-6 py-6 lg:hidden">
          <ul className="flex flex-col gap-5">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="eyebrow text-foreground/80" activeProps={{ className: "text-teal" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
