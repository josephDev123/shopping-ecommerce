import { z } from "zod";
import { Types } from "mongoose";

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

const shippingMethods = ["Standard", "Express", "Same-Day"] as const;
const shippingStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
] as const;

// Main Shipping schema
export const shippingSchema = z.object({
  userId: objectId,
  transactionId: objectId,
  orderId: objectId,
  trackingNumber: z.string().min(1),
  carrier: z.string().optional(),
  shippingMethod: z.enum(shippingMethods).default("Standard"),
  estimatedDeliveryDate: z.coerce.date(),
  actualDeliveryDate: z.coerce.date().optional(),
  status: z.enum(shippingStatuses).default("Pending"),
  deliveryNotes: z.string().optional(),
  proofOfDelivery: z.string().optional(),
});

export type IShipping = z.infer<typeof shippingSchema>;
