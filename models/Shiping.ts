import { randomUUID } from "crypto";
import { Document, model, models, Schema, Types } from "mongoose";

// export interface ITrackingHistory {
//   location: string;
//   status: string;
//   updatedAt?: Date;
// }

// Define the main Shipping interface
export interface IShippingSchema extends Document {
  transactionId: Types.ObjectId;
  orderId: Types.ObjectId;
  trackingNumber: string;
  carrier: string;
  shippingMethod: "Standard" | "Express" | "Same-Day";
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  deliveryNotes?: string;
  proofOfDelivery?: string;
}

const ShippingSchema = new Schema<IShippingSchema>(
  {
    transactionId: { type: Schema.Types.ObjectId, ref: "Transaction" },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID,
    },
    carrier: { type: String, trim: true },
    shippingMethod: {
      type: String,
      enum: ["Standard", "Express", "Same-Day"],
      default: "Standard",
    },
    estimatedDeliveryDate: { type: Date },
    actualDeliveryDate: { type: Date },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },
    deliveryNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ShippingModel =
  models.Shipping || model<IShippingSchema>("Shipping", ShippingSchema);
