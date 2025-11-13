import { Document, model, Schema, Types } from "mongoose";

// Define a reusable address type
// export interface IAddress {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode: string;
// }

// Define a tracking history entry
export interface ITrackingHistory {
  location: string;
  status: string;
  updatedAt?: Date;
}

// Define the main Shipping interface
export interface IShipping extends Document {
  transactionId: Types.ObjectId;
  orderId: Types.ObjectId;
  trackingNumber: string;
  carrier: string;
  shippingMethod: "Standard" | "Express" | "Same-Day";
  // originAddress: IAddress;
  // destinationAddress: IAddress;
  //shippingCost: number;  //i might remove this, becos the order might have it
  estimatedDeliveryDate: Date; //this should be filled during checkout
  actualDeliveryDate?: Date; //this should be filled during checkout
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
  //   trackingHistory: ITrackingHistory[];
  // dispatchedBy?: Types.ObjectId;
  // receivedBy?: string;
  // weight?: number;
  // dimensions?: {
  //   length: number;
  //   width: number;
  //   height: number;
  // };
  //   insuranceAmount?: number;
  proofOfDelivery?: string;
  //   warehouseId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ShippingSchema = new Schema<IShipping>(
  {
    transactionId: { type: Schema.Types.ObjectId, ref: "Transaction" },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    trackingNumber: { type: String, required: true, unique: true },
    carrier: { type: String, trim: true },
    shippingMethod: {
      type: String,
      enum: ["Standard", "Express", "Same-Day"],
      default: "Standard",
    },
    // originAddress: {
    //   street: String,
    //   city: String,
    //   state: String,
    //   country: String,
    //   postalCode: String,
    // },
    // destinationAddress: {
    //   street: String,
    //   city: String,
    //   state: String,
    //   country: String,
    //   postalCode: String,
    // },
    // shippingCost: { type: Number, required: true },
    estimatedDeliveryDate: { type: Date, required: true },
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

export const ShippingModel = model<IShipping>("Shipping", ShippingSchema);
