export type orderMoreDetailType = {
  customer_email: string;
  customer_name: string;
  customer_country: string;
  amount: number;
  currency: string;
  tx_ref: string;
  qty: string;
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
  productImgUrl: [
    {
      url: string;
      path: string;
      _id: string;
    }
  ];
};
