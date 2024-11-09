import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { categoryRepository } from "../repository/CategoryRepo";

export class categoryService {
  constructor(private readonly categoryRepo: categoryRepository) {}

  async getCategoriesByPaginate(page: number, limit: number, user_id: string) {
    try {
      const response = await this.categoryRepo.getCategoriesByPaginate(
        page,
        limit,
        user_id
      );
      return response;
    } catch (error) {
      const errorObj = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        // "something went wrong",
        errorObj.message,
        "CategoryError",
        "500",
        true
      );
    }
  }
}
