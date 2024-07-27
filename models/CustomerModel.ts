import mongoose, { model, models, Schema } from "mongoose";

//this is schema will be look into again because we already have order table that contain customer data

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export interface CustomerType extends Document {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  orders?: string[]; // Assuming orders are referenced by their IDs
}

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const customerSchema = new Schema({
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: addressSchema, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export default mongoose.model("Customer", customerSchema);
const OrderModel =
  models.Customer || model<CustomerType>("Customer", customerSchema);
