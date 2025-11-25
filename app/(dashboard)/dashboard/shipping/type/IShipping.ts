import { Types } from "mongoose";

// Define the main Shipping interface
export interface IShipping {
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
