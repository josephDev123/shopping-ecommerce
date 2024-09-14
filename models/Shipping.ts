import { Schema, model, models } from "mongoose";

type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  method: string;
  cost: number;
  status: string;
  orderId: Schema.Types.ObjectId;
};

const ShippingAddressSchema = new Schema<ShippingAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  method: { type: String, required: true },
  cost: { type: Number, required: true },
  // trackingNumber: { type: String, required: true },
  status: { type: String, required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
});

const Shipping =
  models.Shipping || model<ShippingAddress>("Shipping", ShippingAddressSchema);
export default Shipping;
