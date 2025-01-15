import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  companyName: z.string().optional(),
  country: z.string().min(1, "Country / Region is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town / City is required"),
  province: z.string().min(1, "Province is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["Direct Bank Transfer"]), // "Cash On Delivery"
});
