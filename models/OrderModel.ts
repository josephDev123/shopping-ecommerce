import { Schema, model, models } from "mongoose";

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type Customer = {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
};

type Item = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type Payment = {
  method: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
};

type Shipping = {
  address: Address;
  method: string;
  cost: number;
  trackingNumber: string;
  status: string;
};

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderType extends Document {
  orderId: string;
  customer: Customer;
  items: Item[];
  payment: Payment;
  shipping: Shipping;
  status: string;
  timestamps: Timestamps;
}

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  customer: {
    customerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  payment: {
    method: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  shipping: {
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    method: { type: String, required: true },
    cost: { type: Number, required: true },
    trackingNumber: { type: String, required: true },
    status: { type: String, required: true },
  },
  status: { type: String, required: true },
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

const OrderModel = models.Product || model<OrderType>("Order", orderSchema);
export default OrderModel;
