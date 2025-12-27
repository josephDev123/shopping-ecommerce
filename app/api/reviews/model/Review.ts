import { timeStamp } from "console";
import { model, models, Schema } from "mongoose";

export type IReview = {
  productId?: Schema.Types.ObjectId;
  rating: number;
  userId: Schema.Types.ObjectId;
  content: string;
};

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: Schema.Types.ObjectId },
    rating: { type: Number, min: 1, max: 5 },
    content: { type: String, maxlength: 100, minlength: 3 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// 👇 Add this compound unique index
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const ReviewModel =
  models.Review || model<IReview>("Review", ReviewSchema);
