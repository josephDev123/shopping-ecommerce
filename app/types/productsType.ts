interface ProductImgUrl {
  url: string;
  path: string;
  _id: string;
}

export interface ProductDataType {
  _id: string;
  user_id: string;
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
}

// Define the interface for the overall response
export interface ProductResponseType {
  msg: string;
  name: string;
  operational: boolean;
  type: string;
  data: ProductDataType | ProductDataType[];
}
