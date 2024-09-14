import { Schema, model, models } from "mongoose";

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

export interface OrderType extends Document {
  _id: string;
  items: Item[];
  payment: Payment;
  shippingId: string;
}

const orderSchema = new Schema<OrderType>({
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
});

const OrderModel = models.Product || model<OrderType>("Order", orderSchema);
export default OrderModel;
