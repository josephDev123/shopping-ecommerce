export const OrderMoreDetailColumns = [
  {
    key: "customer_email",
    label: "Customer Email",
  },
  // {
  //   key: "customer_name",
  //   label: "Customer Name",
  // },
  {
    key: "customer_country",
    label: "Customer Country",
  },
  // {
  //   key: "amount",
  //   label: "Amount",
  // },

  {
    key: "currency",
    label: "Currency",
  },

  {
    key: "tx_ref",
    label: "tx_ref",
  },
  {
    key: "qty",
    label: "Qty",
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
    key: "productCategory",
    label: "Product Category",
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
    label: "product Discount",
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
    label: "product Item Weight",
  },
  {
    key: "productUnit",
    label: "Product Unit",
  },
];

export type orderMoreDetailType = {
  customer_email: string;
  // customer_name: string;
  customer_country: string;
  // amount: number;
  currency: string;
  tx_ref: string;
  qty: string;
  productName: string;
  Description: string;
  productCategory: string;
  productTag: string;
  productPrice: string;
  productDiscount: string;
  // productQuantity: number;
  productSKU: string;
  productSize: string;
  productItemWeight: number;
  productUnit: string;
  // productBreath: number;
  // productLength: number;
  // productWidth: number;
  // productImgUrl: [
  //   {
  //     url: string;
  //     path: string;
  //     _id: string;
  //   }
  // ];
};
