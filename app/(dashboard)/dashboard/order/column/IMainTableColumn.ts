import { IOrderStatus } from "@/app/types/ClientOrderType";

interface ProductImgUrl {
  url: string;
  path: string;
  _id: string;
}

export type IMainTableColumn = {
  _id: string;
  user_id: string;
  tx_ref: string;
  products?:
    | {
        qty?: string;
        productName: string;
        Description: string;
        productCategory: string;
        productTag: string;
        productPrice: string;
        productDiscount: string;
        productSKU: string;
        productSize: string;
        productImgUrl: ProductImgUrl[];
      }[]
    | undefined;
  payment: {
    paymentMethod: string;
    amount: number;
    currency: string;
  };
  billing: {
    amount: number;
    currency: string;
  };

  customer: {
    email: string;
    name: string;
    phonenumber: string;
    country: string;
    address: string;
    town: string;
    additionalInfo?: string;
  };
  createdAt: string;
  updatedAt: string;
  order_status: IOrderStatus;
};
