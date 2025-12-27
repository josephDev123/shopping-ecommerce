import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { RelatedItemRepo } from "../repository/RelatedItemRepo";

export class RelatedItemService {
  constructor(private readonly RelatedItemDb: RelatedItemRepo) {}

  async find(skip: number, limit: number, category: string) {
    try {
      const handleGetRelatedItem = await this.RelatedItemDb.find(
        skip,
        limit,
        category
      );
      return handleGetRelatedItem;
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
        throw new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "Unknown",
        "500",
        false
      );
    }
  }
}
