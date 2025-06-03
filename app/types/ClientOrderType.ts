import { CustomerType, Payment } from "@/models/OrderModel";
import { BillingDataType } from "./billingType";
import { ProductDataType } from "./productsType";

export type IOrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processed"
  | "Picked"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
export interface ClientOrderType {
  _id: string;
  user_id: string;
  tx_ref: string;
  items: ProductDataType[];
  payment: Payment;
  billing: BillingDataType;
  customer: CustomerType;
  createdAt: string;
  updatedAt: string;
  order_status: IOrderStatus;
}
