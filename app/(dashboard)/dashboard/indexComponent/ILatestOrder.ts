interface ProductImgUrl {
  url: string;
  path: string;
  // _id: string;
}

export interface IProduct {
  _id: string;
  productName: string;
  Description: string;
  productCategory: string;

  productPrice: string;
  productDiscount: string;
  productQuantity: number;
  productSKU: string;
  productImgUrl: ProductImgUrl[];
}

export type ILatestOrderDTO = {
  items?: IProduct[];
  payment: {
    amount: number;
    currency: string;
  };
  billing: {
    amount: number;
    currency: string;
  };
  customer: {
    name: string;
    email: string;
  };
};
