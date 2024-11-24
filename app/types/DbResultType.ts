import { OrderType } from "@/models/OrderModel";
import { CategoryType } from "./categoryType";

export interface IdbOrderType {
  totalOrders: number;
  orders: OrderType[];
}

export interface IdbCustomerType {
  totalCustomer: number;
  customers: OrderType[];
}

export interface IdbCategoriesPurchasedType {
  totalPurchaseCategoryCount: number;
  categoryPurchased: CategoryType[];
}
