import { BillingDataType } from "@/app/types/billingType";
import { ProductDataType } from "@/app/types/productsType";
import mongoose, { Schema, model, models, Types } from "mongoose";

export type CustomerType = {
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

export type Payment = {
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

const productItemSchema = new Schema<ProductDataType>({
  qty: { type: String, required: true },
  productName: { type: String, required: true },
  Description: { type: String, required: true },
  productCategory: { type: String, required: true },
  productTag: { type: String, required: true },
  productPrice: { type: String, required: true },
  productDiscount: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productSKU: { type: String, required: true },
  productSize: { type: String, required: true },
  productItemWeight: { type: Number, required: true },
  productUnit: { type: String, required: true },
  productBreath: { type: Number, required: true },
  productLength: { type: Number, required: true },
  productWidth: { type: Number, required: true },
  productImgUrl: [
    {
      url: { type: String, required: true },
      path: { type: String, required: true },
      _id: { type: String, required: true },
    },
  ],
});

export interface OrderType extends Document {
  user_id: Schema.Types.ObjectId;
  tx_ref: string;
  items: ProductDataType[];
  payment: Payment;
  billing: BillingDataType;
  customer: CustomerType;
}

const orderSchema = new Schema<OrderType>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    tx_ref: { type: String, required: true },
    items: [productItemSchema],
    payment: paymentSchema,
    billing: billingDataSchema,
    customer: customerSchema,
  },
  { timestamps: true }
);

const OrderModel = models.Order || model<OrderType>("Order", orderSchema);
export default OrderModel;
