import { model, models, Schema } from "mongoose";

type IReview = {
  productId?: Schema.Types.ObjectId;
  rating: number;
  userId: Schema.Types.ObjectId;
  content: string;
};

const ReviewSchema = new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId },
  rating: { type: Number, min: 1, max: 5 },
  content: { type: String, maxlength: 100, minlength: 3 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const ReviewModel =
  models.Review || model<IReview>("Review", ReviewSchema);
