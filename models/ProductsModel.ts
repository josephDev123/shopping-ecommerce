import mongoose, { Schema, model, models } from "mongoose";

type uploadImgPattern = {
  url: string;
  path: string;
};
export type ProductSchemaTypes = {
  id?: string;
  user_id?: Schema.Types.ObjectId;
  reviewId: Schema.Types.ObjectId;
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
  productImgUrl: uploadImgPattern[];
};

const ProductSchema = new Schema<ProductSchemaTypes>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviewId: [{ type: Schema.Types.ObjectId, ref: "Review" }],
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
  productImgUrl: [
    {
      url: { type: String, required: true },
      path: { type: String, required: true },
    },
  ],
});

const ProductModel =
  models.Product || model<ProductSchemaTypes>("Product", ProductSchema);
export default ProductModel;
