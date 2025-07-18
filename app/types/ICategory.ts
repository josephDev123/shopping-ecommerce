type ProductImage = {
  url: string;
  path: string;
  _id: string;
};

type Product = {
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
  productImgUrl: ProductImage[];
};

type CategoryGroup = {
  _id: string;
  products: Product[];
};

export type ICategoriesResponse = {
  totalCategories: number;
  categoriesGroup: CategoryGroup[];
};
