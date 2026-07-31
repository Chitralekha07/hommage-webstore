import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { enquirySchema, type EnquiryInput } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: EnquiryInput) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      organisation: data.organisation || null,
      enquiry_type: data.enquiryType,
      location: data.location || null,
      message: data.message,
    });

    if (error) {
      console.error("[enquiries] insert failed", error.message);
      return { ok: false as const, error: "We could not send your enquiry. Please try again." };
    }

    return { ok: true as const };
  });
