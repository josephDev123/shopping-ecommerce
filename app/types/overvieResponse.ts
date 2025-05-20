interface Customer {
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
}

interface ProductImgUrl {
  url: string;
  path: string;
  _id: string;
}

interface Product {
  qty: string;
  productName: string;
  Description: string;
  productCategory: string;
  productTag: string;
  productPrice: string;
  productDiscount: string;
  productQuantity: number;
  productSKU: string;
  productSize: string;
  productItemWeight: number;
  productUnit: string;
  productBreath: number;
  productLength: number;
  productWidth: number;
  productImgUrl: ProductImgUrl[];
  _id: string;
}

interface Payment {
  amount: number;
  currency: string;
  _id: string;
}

interface Billing {
  amount: number;
  currency: string;
  _id: string;
}

export interface IOrder {
  _id: string;
  user_id: string;
  tx_ref: string;
  items?: Product[];
  payment: Payment;
  billing: Billing;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OverviewResponse {
  totalOrders: number;
  latestCustomers: { customer: Customer }[];
  mostBoughtCategories: { _id: string; count: number }[];
  latestOrders: IOrder[];
  transactionCountResult: {
    success: number;
    pending: number;
  };
}
