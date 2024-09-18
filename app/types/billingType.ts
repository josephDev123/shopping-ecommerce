export type BillingDataType = {
  amount: number;
  currency: string;
  customer: {
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
  };
};
