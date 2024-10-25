import { ProductDataType } from "./productsType";

export type PaymentDataType = {
  user_id: string; // user id
  tx_ref: string; // Result of generateUniquePaymentID
  amount: number; // total amount
  currency: string; // fixed currency
  redirect_url: string; // redirect URL after payment
  customer_billing: {
    email: string;
    name: string;
    phonenumber: string;
    companyName: string;
    country: string;
    address: string;
    town: string;
    province: string;
    zipCode: string;
    additionalInfo: string;
    paymentMethod: string;
  };
  item: string[];
  customizations: {
    title: string; // customization title
  };
};
