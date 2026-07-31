## HOMMAGE — Experiential Retail Website

### Brand system
- Palette: warm ivory base, deep teal from the logo as accent, antique gold for rules, borders and hairline detail. Semantic tokens in `src/styles.css` (oklch), no hardcoded colours.
- Typography: wide-tracked classical serif for the HOMMAGE wordmark and headings (matching the logo's thin-stroke Roman caps), clean sans for body. Generous whitespace, wide-placed layouts, hairline gold dividers.
- Motion: restrained — fade/rise on scroll, slow image scale, gold underline links. Nothing bouncy.
- Assets: uploaded logo, flower and hero video uploaded via Lovable Assets and referenced by CDN URL. Favicon generated as a square crop of the mark.

### Intro: the frosted parting doors
- Full-screen overlay on first load of a session (`sessionStorage`).
- Two frosted-glass panels with gold ogee-arch framing, subtle grain and light sweep, parting left/right with a slow eased motion; the gold flower mark sits centred, revealed as they open, then settles.
- Skippable by click/scroll/Esc; respects `prefers-reduced-motion`; replays next session.

### Scroll-linked logo formation (home)
- After the intro, the gold flower stays pinned centre-screen.
- As the user scrolls, the letters `H` and `MMAGE` fade and track outward around it in the logo's font and colour, and the ogee frame draws itself in — recreating the full logo lockup — then it shrinks and docks into the header as the sticky nav mark.
- Reduced-motion fallback: static assembled logo.

### Pages
- **Home** — hero recreating the reference layout: left column with `HOMMAGE` wordmark, a vertical list of categories (Ready-to-wear / Accessories / Hampers / Events …), a season heading and an intro paragraph; right column is the uploaded video, autoplay/muted/loop/playsInline, rounded, full-frame `object-cover`. Below: teaser strips for Events, Hampers and Journal.
- **Shop** — intentionally blank shell (header/footer + "Coming soon" mark) for later connection.
- **Hampers** — same blank shell.
- **Events** — full-bleed media-first layout: each event has a title, date, short description, and a full-frame image/video gallery (mixed images + inline videos, `object-cover`, lightbox on click). Sections for *Past experiences* and *Upcoming events* with a news list. Seeded with placeholders sized for the images you'll send next.
- **Journal** — static blog: index of post cards + individual post pages, placeholder editorial copy and imagery.
- **About / Contact** — brand story plus an enquiry form aimed at vendors, collaborators, event artists and hospitality partners.

### Enquiry form (Lovable Cloud)
- Enable Cloud; create an `enquiries` table with explicit grants, RLS `INSERT` for anon, reads restricted to admins only.
- Fields: name, email, phone, organisation, enquiry type (Vendor / Collaborator / Event artist / Hotel & hospitality / Press / Other), location, message.
- Zod validation client-side and inside the server function; length limits; toast confirmation via sonner.

### Technical notes
- TanStack Start file routes: `index.tsx`, `shop.tsx`, `hampers.tsx`, `events.tsx`, `journal.tsx`, `journal.$slug.tsx`, `contact.tsx`. Each gets its own `head()` metadata.
- Shared header (docked logo mark + nav) and footer in `__root.tsx`; sonner `<Toaster />` mounted there.
- Intro overlay and scroll-logo are isolated client components; scroll driven by `useScroll`-style listeners with `IntersectionObserver` for reveals.
- Journal content lives in a typed local data module so posts are easy to edit.
- Enquiry submit via `createServerFn` (`src/lib/enquiries.functions.ts`) writing through the anon-insert policy.

### What I'll need from you
- Event images/videos in your next message — placeholders go in until then.
