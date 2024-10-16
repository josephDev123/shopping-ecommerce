import { BillingDataType } from "@/app/types/billingType";
import { Schema, model, models } from "mongoose";

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

type Payment = {
  paymentMethod: string;
  amount: number;
  currency: string;
  status: "Pending | Success | Fail";
};

export interface OrderType extends Document {
  tx_ref: string;
  items: string[];
  payment: Payment;
  billing: BillingDataType;
  customer: CustomerType;
}

const orderSchema = new Schema<OrderType>(
  {
    tx_ref: { type: String, required: true },
    items: [String],
    payment: {
      paymentMethod: { type: String },
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      status: { type: String, default: "Pending" },
    },
    billing: billingDataSchema,
    customer: customerSchema,
  },
  { timestamps: true }
);

const OrderModel = models.Order || model<OrderType>("Order", orderSchema);
export default OrderModel;
