import { Schema, model, models } from "mongoose";

export type ProductSchemaTypes = {
  id?: string;
  productName?: string;
  Description?: string;
  productCategory?: string;
  productTag?: string;
  productPrice?: string;
  productDiscount?: string;
  productQuantity?: number;
  productSKU?: string;
  productSize?: string;
  productColor?: string;
  productItemWeight?: number;
  productUnit?: string;
  productBreath?: number;
  productLength?: number;
  productWidth?: number;
  productImgUrl: string[];
};

const ProductSchema = new Schema<ProductSchemaTypes>({
  productName: { type: String },
  Description: { type: String },
  productCategory: { type: String },
  productTag: { type: String },
  productPrice: { type: String },
  productDiscount: { type: String },
  productQuantity: { type: Number },
  productSKU: { type: String },
  productSize: { type: String },
  productColor: { type: String },
  productItemWeight: { type: Number },
  productUnit: { type: String },
  productBreath: { type: Number },
  productLength: { type: Number },
  productWidth: { type: Number },
  productImgUrl: { type: [String] },
});

const ProductModel =
  models.Product || model<ProductSchemaTypes>("Product", ProductSchema);
export default ProductModel;