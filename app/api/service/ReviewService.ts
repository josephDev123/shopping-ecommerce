import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ReviewRepo } from "../repository/ReviewRepo";
import { IReviewArg } from "../reviews/create/route";

export class ReviewService {
  constructor(private readonly ReviewRepo: ReviewRepo) {}

  async handleCreate({ content, productId, rating, userId }: IReviewArg) {
    // console.log("service", content, productId, rating, userId);
    try {
      const response = await this.ReviewRepo.Create({
        content,
        productId,
        rating,
        userId,
      });
      return response;
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

  async handleFindReviews(page: number, limit: number, productId: string) {
    try {
      if (!productId?.trim()) {
        throw new GlobalErrorHandler(
          "ProductId is required",
          "EmptyProductId",
          "400",
          true
        );
      }
      const response = await this.ReviewRepo.find(page, limit, productId);
      return response;
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
