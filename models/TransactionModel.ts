import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
});
export const TransactionModel =
  models.Transaction || model("Transaction", TransactionSchema);
