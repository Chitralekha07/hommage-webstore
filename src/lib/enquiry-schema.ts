import { z } from "zod";

export const enquiryTypes = [
  { value: "vendor", label: "Vendor / Maker" },
  { value: "collaborator", label: "Collaborator" },
  { value: "event_artist", label: "Event artist" },
  { value: "hospitality", label: "Hotel & hospitality" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40, "Phone number is too long").optional().or(z.literal("")),
  organisation: z.string().trim().max(150, "Organisation is too long").optional().or(z.literal("")),
  enquiryType: z.enum(["vendor", "collaborator", "event_artist", "hospitality", "press", "other"]),
  location: z.string().trim().max(120, "Location is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more")
    .max(2000, "Message must be under 2000 characters"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
