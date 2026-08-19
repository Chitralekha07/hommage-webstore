import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const p2 = params as Record<string, string | undefined>;
        const path = p2["_splat"] ?? p2["*"] ?? "";
        console.log("[media] params", JSON.stringify(params));
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage
          .from("media")
          .createSignedUrl(path, 60 * 60);

        if (error || !data?.signedUrl) {
          console.log("[media] signed url error", path, error?.message);
          return new Response("Not found", { status: 404 });
        }

        return new Response(null, {
          status: 302,
          headers: { location: data.signedUrl, "cache-control": "public, max-age=1800" },
        });
      },
    },
  },
});
