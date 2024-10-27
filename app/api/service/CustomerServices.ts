import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { CustomerRepo } from "../repository/CustomerRepo";
import { OrderRepository } from "../repository/OrderRepository";

export class CustomerService {
  constructor(private readonly CustomerRepo: CustomerRepo) {
    this.CustomerRepo = CustomerRepo;
  }
  async findByPaginate(user_id: string, page: number, limit: number) {
    try {
      const response = await this.CustomerRepo.findByPaginate(
        user_id,
        page,
        limit
      );
      return response;
    } catch (error) {
      throw new GlobalErrorHandler("Order fail", "OrderError", "400", true);
    }
  }
}
