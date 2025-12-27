import { model, models, Schema } from "mongoose";

export interface PaymentDetails {
  amount: number;
  currency?: string;
  charged_amount: number;
  app_fee?: number;
  merchant_fee?: number;
  narration?: string;
  status: string;
  payment_type?: string;
}

export interface TransactionType {
  orderId: Schema.Types.ObjectId;
  paymentDetails: PaymentDetails;
}

const TransactionSchema = new Schema<TransactionType>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  paymentDetails: {
    amount: { type: Number, required: true },
    currency: String,
    charged_amount: { type: Number, required: true },
    app_fee: Number,
    merchant_fee: Number,
    narration: String,
    status: { type: String, required: true },
    payment_type: String,
  },
});
export const TransactionModel =
  models.Transaction || model("Transaction", TransactionSchema);
