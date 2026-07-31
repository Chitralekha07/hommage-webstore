import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/hampers")({
  head: () => ({
    meta: [
      { title: "Hampers — Hommage" },
      {
        name: "description",
        content: "Hommage hampers: layered compositions for giving, sealed and made to be opened slowly.",
      },
      { property: "og:title", content: "Hampers — Hommage" },
      { property: "og:description", content: "Layered gift compositions from the Hommage atelier." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Hampers"
      note="Our hamper compositions are being finished. Seasonal and bespoke offerings will appear here soon."
    />
  ),
});
