import { BillingDataType } from "@/app/types/billingType";
import { Schema, model, models } from "mongoose";

// type Item = {
//   productId: string;
//   name: string;
//   quantity: number;
//   price: number;
//   total: number;
// };

const customerSchema = new Schema({
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
  tx_ref: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  customer: { type: customerSchema, required: true },
});

type Payment = {
  method: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: "Pending | success";
};

export interface OrderType extends Document {
  _id: string;
  items: string[];
  payment: Payment;
  billing: BillingDataType;
}

const orderSchema = new Schema<OrderType>({
  items: [String],
  payment: {
    method: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  billing: billingDataSchema,
});

const OrderModel = models.Product || model<OrderType>("Order", orderSchema);
export default OrderModel;
