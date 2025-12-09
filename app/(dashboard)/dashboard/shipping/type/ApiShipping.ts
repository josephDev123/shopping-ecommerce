// =========================
// Payment Details
// =========================
export interface PaymentDetails {
  amount: number;
  currency: string;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  narration: string;
  status: string; // e.g. "successful"
  payment_type: string;
}

// =========================
// Transaction
// =========================
export interface Transaction {
  _id: string;
  orderId: string;
  paymentDetails: PaymentDetails;
  __v: number;
}

// =========================
// Customer
// =========================
export interface Customer {
  _id: string;
  email: string;
  name: string;
  phonenumber: string;
  companyName: string;
  country: string;
  address: string;
  town: string;
  province: string;
  zipCode: string;
  additionalInfo?: string;
}

// =========================
// Product Image
// =========================
export interface ProductImage {
  url: string;
  path: string;
  _id: string;
}

// =========================
// Shipping Item
// (Order.items simplified)
// =========================
export interface ShippingItem {
  productName: string;
  productSKU: string;
  productCategory: string;
  qty: string;
  Description: string;
  productImgUrl: ProductImage[];
}

// =========================
// A Single Shipping Entry
// =========================
export interface Shipping {
  _id: string;
  trackingNumber: string;
  shippingMethod: "Standard" | "Express" | "Same-Day" | string;
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "Returned"
    | string;
  createdAt: string;
  updatedAt: string;

  transaction: Transaction;
  customer: Customer;
  items: ShippingItem[];
}

// =========================
// Shippings Response Structure
// =========================
export interface ShippingsData {
  shippings: Shipping[];
  totalCount: number;
}

// =========================
// FULL API RESPONSE TYPE
// =========================
export interface ShippingsApiResponse {
  msg: string;
  data: ShippingsData;
}
