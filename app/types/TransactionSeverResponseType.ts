import { ProductDataType } from "./productsType";

export type TransactionServerResponseType = {
  _id: string;
  orderId: string;
  __v: number;
  orderDetails: {
    _id: string;
    user_id: string;
    tx_ref: string;
    items: ProductDataType[];
    payment: {
      amount: number;
      currency: string;
      status: string;
      _id: string;
    };
    billing: {
      amount: number;
      currency: string;
      _id: string;
    };
    customer: {
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
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
};
