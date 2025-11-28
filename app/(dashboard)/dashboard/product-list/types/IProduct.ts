export interface Product {
  _id: string;
  user_id: string;
  productName: string;
  Description: string;
  productCategory: string;
  productTag: string;
  productPrice: string; // looks like a string in your data
  productDiscount: string; // also string in your data
  productQuantity: number;
  productSKU: string;
  productSize: string;
  productItemWeight: number;
  productUnit: string;
  productBreath: number;
  productLength: number;
  productWidth: number;
  productImgUrl: string[];
  __v: number;
}

export interface ProductsResponse {
  products: Product[];
  totalDoc: number;
}
