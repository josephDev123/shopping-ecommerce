import { OrderType } from "@/models/OrderModel";
import { Model } from "mongoose";

export class DashboardOverviewRepo {
  constructor(private readonly OrderModel: Model<OrderType>) {}
  async find() {}
}
