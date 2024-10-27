import { BillingDataType } from "@/app/types/billingType";
import mongoose, { Schema, model, models, Types } from "mongoose";

type CustomerType = {
  email: string;
  name: string;
  phonenumber: string;
  companyName: string;
  country: string;
  address: string;
  town: string;
  province: string;
  zipCode: string;
  additionalInfo?: string; // Optional field
};

type Payment = {
  paymentMethod: string;
  amount: number;
  currency: string;
  status: "Pending" | "Success" | "Fail";
};

const customerSchema = new Schema<CustomerType>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phonenumber: { type: String, required: true },
  companyName: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  town: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: String, required: true },
  additionalInfo: { type: String },
});

const billingDataSchema = new Schema<BillingDataType>({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  // customer: customerSchema,
});

const paymentSchema = new Schema<Payment>({
  paymentMethod: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Success", "Fail"],
    default: "Pending",
  },
});

export interface OrderType extends Document {
  user_id: Schema.Types.ObjectId;
  tx_ref: string;
  items: string[];
  payment: Payment;
  billing: BillingDataType;
  customer: CustomerType;
}

const orderSchema = new Schema<OrderType>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    tx_ref: { type: String, required: true },
    items: [String],
    payment: paymentSchema,
    billing: billingDataSchema,
    customer: customerSchema,
  },
  { timestamps: true }
);

const OrderModel = models.Order || model<OrderType>("Order", orderSchema);
export default OrderModel;
