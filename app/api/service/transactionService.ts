import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { transactionRepository } from "../repository/TransactionRepository";

export class TransactionService {
  constructor(private readonly transactionRepository: transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async findByPaginate(user_id: string, page: number, limit: number) {
    try {
      const response = await this.transactionRepository.findByPaginate(
        user_id,
        page,
        limit
      );

      return response;
    } catch (error) {
      throw new GlobalErrorHandler(
        "Something went wrong",
        "TransactionServiceError",
        "500",
        true
      );
    }
  }
}
