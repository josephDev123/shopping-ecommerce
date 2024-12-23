import mongoose, { models } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone_number: String,
  email: String,
  created_at: Date,
});

const CardSchema = new mongoose.Schema({
  first_6digits: String,
  last_4digits: String,
  issuer: String,
  country: String,
  type: String,
  expiry: String,
});

const TransactionSchema = new mongoose.Schema({
  event: String,
  data: {
    id: Number,
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
    account_id: Number,
    customer: CustomerSchema,
    card: CardSchema,
  },
});

const Flw_Transaction =
  models.FlwTransaction || mongoose.model("FlwTransaction", TransactionSchema);

export default Flw_Transaction;
