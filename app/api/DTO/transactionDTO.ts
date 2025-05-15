export type ITransactionDTO = {
  _id: string;
  orderId: string;
  paymentDetails: {
    amount: number;
    currency: string;
    charged_amount: number;
    app_fee: number;
    merchant_fee: number;
    narration: string;
    status: string;
    payment_type: string;
  };

  order: {
    // _id: string;
    // user_id: string;
    tx_ref: string;
    items: {
      qty: string;
      productName: string;
      //   Description: string;
      //   productCategory: string;
      //   productTag: string;
      //   productPrice: string;
      //   productDiscount: string;
      //   productQuantity: number;
      //   productSKU: string;
      //   productSize: string;
      //   productItemWeight: number;
      //   productUnit: string;
      //   productBreath: number;
      //   productLength: number;
      //   productWidth: number;
      productImgUrl: {
        url: string;
        path: string;
        // _id: string;
      }[];
      _id: string;
    }[];
    // payment: {
    //   amount: number;
    //   currency: string;
    //   _id: string;
    // };
    billing: {
      amount: number;
      currency: string;
      //   _id: string;
    };
    customer: {
      email: string;
      name: string;
      phonenumber: string;
      //   companyName: string;
      country: string;
      address: string;
      //   town: string;
      //   province: string;
      //   zipCode: string;
      //   additionalInfo: string;
      //   _id: string;
    };
    order_status: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    // __v: number;
  };
};

export type ITransactionData = {
  totalCount: string;
  transactionData: ITransactionDTO[];
};
