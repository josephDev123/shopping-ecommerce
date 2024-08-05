interface ProductImgUrl {
  url: string;
  path: string;
  _id: string;
}

interface Product {
  id: string;
  productName: string;
  Description: string;
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

export interface ProductCategoryType {
  _id: string;
  products: Product[];
}
