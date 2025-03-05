export type moreCategoryType = {
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
  //   productImgUrl: {
  //     url: string;
  //     path: string;
  //     _id: string;
  //   }[];
};

export const MoreCategoryColumn = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "productName",
    label: "Product Name",
  },
  {
    key: "Description",
    label: "Description",
  },
  {
    key: "productTag",
    label: "Product Tag",
  },
  {
    key: "productPrice",
    label: "Product Price",
  },
  {
    key: "productDiscount",
    label: "Product Discount",
  },
  {
    key: "productQuantity",
    label: "Product Quantity",
  },
  {
    key: "productSKU",
    label: "Product SKU",
  },
  {
    key: "productSize",
    label: "Product Size",
  },
  {
    key: "productItemWeight",
    label: "Product Item Weight",
  },
  {
    key: "productUnit",
    label: "Product Unit",
  },
  {
    key: "productBreath",
    label: "Product Breath",
  },
  {
    key: "productLength",
    label: "Product Length",
  },
  {
    key: "productWidth",
    label: "Product Width",
  },
  //   {
  //     key: "productImgUrl",
  //     label: "Product Image URL",
  //   },
];
