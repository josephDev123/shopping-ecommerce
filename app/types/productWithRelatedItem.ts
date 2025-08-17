// If your API returns ObjectIds as strings (as in your sample):
type ObjectIdString = string;

export interface ProductImage {
  url: string;
  path: string;
  _id: ObjectIdString;
}

export interface FullProduct {
  _id: ObjectIdString;
  user_id: ObjectIdString;
  productName: string;
  Description: string;
  productCategory: string;
  productTag: string;
  productPrice: string; // note: string in your sample
  productDiscount: string; // note: string in your sample
  productQuantity: number;
  productSKU: string;
  productSize: string;
  productItemWeight: number;
  productUnit: string;
  productBreath: number; // (typo? breadth)
  productLength: number;
  productWidth: number;
  productImgUrl: ProductImage[];
  __v?: number;
}

// Related items are a subset of fields from FullProduct
export type RelatedProduct = Pick<
  FullProduct,
  | "_id"
  | "productName"
  | "Description"
  | "productCategory"
  | "productTag"
  | "productPrice"
  | "productDiscount"
  | "productImgUrl"
>;

export interface RelatedBlock {
  items: RelatedProduct[];
  total: number;
  page: number;
  pageCount: number;
}

export interface IProductItemWithRelatedResponse {
  product: FullProduct;
  related: RelatedBlock;
}
