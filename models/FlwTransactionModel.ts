import { models, Schema, model } from "mongoose";
export interface Customer {
  cid: string;
  name: string;
  phone_number: string;
  email: string;
  created_at: Date;
}

export interface Card {
  first_6digits: string;
  last_4digits: string;
  issuer: string;
  country: string;
  type: string;
  expiry: string;
}

export interface TransactionData {
  id: string;
  tx_ref: string;
  flw_ref: string;
  device_fingerprint: string;
  amount: number;
  currency: string;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  ip: string;
  narration: string;
  status: string;
  payment_type: string;
  created_at: Date;
  account_id: string;
  customer: Customer;
  card: Card;
}

export interface MetaData {
  __CheckoutInitAddress: string;
}

export interface TransactionType {
  event: string;
  data: TransactionData;
  meta_data: MetaData;
}

const CustomerSchema = new Schema<Customer>({
  cid: String,
  name: String,
  phone_number: String,
  email: String,
  created_at: Date,
});

const CardSchema = new Schema<Card>({
  first_6digits: String,
  last_4digits: String,
  issuer: String,
  country: String,
  type: String,
  expiry: String,
});

const TransactionSchema = new Schema<TransactionType>({
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
  models.FlwTransaction ||
  model<TransactionType>("FlwTransaction", TransactionSchema);

export default Flw_Transaction;
