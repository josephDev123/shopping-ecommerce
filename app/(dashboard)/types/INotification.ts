type Metadata = {
  id: string;
  name: string;
  price: string;
};

export type INotification = {
  _id: string;
  label: string;
  type: "Order" | "Transaction";
  from: string;
  to: string;
  read: boolean;
  __v: number;
  metadata?: Metadata;
  link?: string;
};
