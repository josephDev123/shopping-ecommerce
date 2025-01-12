import { models, Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  cid: String,
  name: String,
  phone_number: String,
  email: String,
  created_at: Date,
});

const CardSchema = new Schema({
  first_6digits: String,
  last_4digits: String,
  issuer: String,
  country: String,
  type: String,
  expiry: String,
});

const TransactionSchema = new Schema({
  event: String,
  data: {
    id: String,
    tx_ref: String,
    flw_ref: String,
    device_fingerprint: String,
    amount: Number,
    currency: String,
    charged_amount: Number,
    app_fee: Number,
    merchant_fee: Number,
    processor_response: String,
    auth_model: String,
    ip: String,
    narration: String,
    status: String,
    payment_type: String,
    created_at: Date,
    account_id: String,
    customer: CustomerSchema,
    card: CardSchema,
  },
  meta_data: {
    __CheckoutInitAddress: String,
  },
  // "event.type": String,
});

const Flw_Transaction =
  models.FlwTransaction || model("FlwTransaction", TransactionSchema);

export default Flw_Transaction;
