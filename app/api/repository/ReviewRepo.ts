import { IReview } from "@/models/Review";
import { Model, Types, Schema } from "mongoose";
import { IReviewArg } from "../reviews/create/route";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class ReviewRepo {
  constructor(private readonly db: Model<IReview>) {}

  async Create({ content, productId, rating, userId }: IReviewArg) {
    try {
      const reviewed = await this.db.findOne({ userId, productId });
      if (reviewed) {
        throw new GlobalErrorHandler(
          "User already  reviewed Product/item",
          "DuplicateReviewError",
          "400",
          true
        );
      }
      const CreateQuery = await this.db.create({
        content,
        productId,
        rating,
        userId,
      });

      return CreateQuery;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.msg,
          error.name,
          error.code,
          error.operational
        );
      }
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "400", false);
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "UnknownError",
        "500",
        false
      );
    }
  }

  async find(page: number, limit: number, productId: string) {
    try {
      const skip = (page - 1) * limit;
      const reviewed = await this.db
        .find({ productId: new Types.ObjectId(productId) })
        .limit(limit)
        .skip(skip);

      return reviewed;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "400", false);
      }

      if (error instanceof Error) {
        throw new GlobalErrorHandler(
          "Something went wrong",
          error.name,
          "500",
          false
        );
      }
    }
  }
}
