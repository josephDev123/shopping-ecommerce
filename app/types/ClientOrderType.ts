import { CustomerType, Payment } from "@/models/OrderModel";
import { BillingDataType } from "./billingType";

export interface ClientOrderType {
  _id: string;
  user_id: string;
  tx_ref: string;
  items: string[];
  payment: Payment;
  billing: BillingDataType;
  customer: CustomerType;
  createdAt: string;
  updatedAt: string;
}
