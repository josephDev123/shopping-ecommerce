import { model, models, Schema } from "mongoose";

export interface TransactionType {
  orderId: Schema.Types.ObjectId;
}

const TransactionSchema = new Schema<TransactionType>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
});
export const TransactionModel =
  models.Transaction || model("Transaction", TransactionSchema);
