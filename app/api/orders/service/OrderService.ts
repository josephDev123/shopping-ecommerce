import { OrderType } from "@/app/api/orders/model/OrderModel";
import { OrderRepository } from "../repository/OrderRepository";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {
    this.orderRepo = orderRepo;
  }
  async findByPaginate(user_id: string, page: number, limit: number) {
    try {
      const response = await this.orderRepo.findByPaginate(
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
