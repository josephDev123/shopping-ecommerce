import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" }),

  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Must be a valid email address" }),

  subject: z
    .string()
    .max(150, { message: "Subject must be at most 150 characters" })
    .optional(),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must be at most 1000 characters" }),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;
export default ContactFormSchema;
