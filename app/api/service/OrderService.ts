import { OrderRepository } from "../repository/OrderRepository";

export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {
    this.orderRepo = orderRepo;
  }
  async findByPaginate(id: string, filterByDateRange: string, page: number) {
    const response = await this.orderRepo.findByPaginate(
      id,
      filterByDateRange,
      page
    );
    return response;
  }
}
