import { ProductDataType } from "./productsType";

type Payment = {
  amount: number;
  currency: string;
  status: string;
};

type Customer = {
  email: string;
  name: string;
  phonenumber: string;
  companyName: string;
  country: string;
  address: string;
  town: string;
  province: string;
  zipCode: string;
  additionalInfo: string;
  _id: string;
};

type Billing = {
  amount: number;
  currency: string;
  _id: string;
};

export type transactionOutcomeType = {
  payment: Payment;
  _id: string;
  tx_ref: string;
  items: ProductDataType[];
  billing: Billing;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
