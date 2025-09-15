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

  // async find(page: number, limit: number, productId: string) {
  //   try {
  //     const skip = (page - 1) * limit;
  //     const reviewed = await this.db
  //       .find({ productId: new Types.ObjectId(productId) })
  //       .limit(limit)
  //       .skip(skip);
  //     if (reviewed.length === 0) {
  //       return {
  //         reviews: [],
  //         totalReview: 0,
  //         rating: 0,
  //       };
  //     }

  //     const totalRating = reviewed.reduce(
  //       (sum, review) => sum + review.rating,
  //       0
  //     );

  //     const rating = Math.ceil(totalRating / reviewed.length);
  //     console.log(rating);
  //     return {
  //       reviews: reviewed,
  //       totalReview: reviewed.length,
  //       rating: rating,
  //     };
  //   } catch (error) {
  //     if (error instanceof GlobalErrorHandler) {
  //       throw new GlobalErrorHandler(
  //         error.message,
  //         error.name,
  //         error.code,
  //         error.operational
  //       );
  //     }
  //     if (error instanceof Error) {
  //       throw new GlobalErrorHandler(error.message, error.name, "400", false);
  //     }

  //     if (error instanceof Error) {
  //       throw new GlobalErrorHandler(
  //         "Something went wrong",
  //         error.name,
  //         "500",
  //         false
  //       );
  //     }
  //   }
  // }

  async find(page: number, limit: number, productId: string) {
    try {
      const skip = (page - 1) * limit;

      const reviewed = await this.db
        .find({ productId: new Types.ObjectId(productId) })
        .limit(limit)
        .skip(skip)
        .populate("userId");

      if (reviewed.length === 0) {
        return {
          reviews: [],
          totalReview: 0,
          distribution: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
        };
      }

      // --- Star Distribution ---
      const distribution: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      reviewed.forEach((review) => {
        distribution[review.rating] = (distribution[review.rating] || 0) + 1;
      });

      const totalReviews = reviewed.length;

      return {
        reviews: reviewed,
        totalReview: totalReviews,
        distribution: distribution,
      };
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

      throw new GlobalErrorHandler(
        "Something went wrong",
        "Error",
        "500",
        false
      );
    }
  }
}
