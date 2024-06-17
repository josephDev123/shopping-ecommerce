import { Schema, model, models } from "mongoose";

export type AddProductSchemaTypes = {
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

const AddProductSchema = new Schema<AddProductSchemaTypes>({
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

const AddProductModel =
  models.AddProduct ||
  model<AddProductSchemaTypes>("AddProduct", AddProductSchema);
export default AddProductModel;
