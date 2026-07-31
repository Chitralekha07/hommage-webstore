import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Hommage" },
      {
        name: "description",
        content: "The Hommage shop: objects, ready-to-wear and small editions. Opening soon.",
      },
      { property: "og:title", content: "Shop — Hommage" },
      { property: "og:description", content: "Objects, ready-to-wear and small editions from Hommage." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Shop"
      note="The Hommage shop is being composed. Objects, ready-to-wear and small editions will be released here shortly."
    />
  ),
});
