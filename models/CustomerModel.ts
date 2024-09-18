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
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  ordersId: string[]; // Assuming orders are referenced by their IDs
}

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const customerSchema = new Schema<CustomerType>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: addressSchema, required: true },
  ordersId: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Customer =
  models.Customer || model<CustomerType>("Customer", customerSchema);
export default Customer;
