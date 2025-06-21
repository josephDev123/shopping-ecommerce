import { Queue } from "bullmq";
import { OrderFactoryNotification } from "../factories/NotificationFactoryBase";
import mongoose from "mongoose";
import { NotificationRepo } from "../repository/NotificationRepo";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export type IProcessNotification = {
  label?: string;
  type: string;
  from: string;
  to: string;
  read?: false;
  link?: string;
  data?: {
    name: string;
    price: string;
    id: string;
  };
};

export class Notification {
  type = "";
  // content = "";
  from = null;
  to = null;
  read = false;
  link = "";
  data = {};
  user_id;

  constructor(
    private readonly OrderQueue: Queue,
    private readonly NotificationRepo: NotificationRepo,
    user_id: string
  ) {
    this.user_id = user_id;
  }

  async processNotificationType(data: IProcessNotification) {
    switch (data.type) {
      case "order":
        OrderFactoryNotification(data, this.OrderQueue);
        break;

      default:
        break;
    }
  }

  async get(limit: number, page: number) {
    try {
      const parseLimit = Number(limit);
      const parsePage = Number(page);
      const user_id = new mongoose.Types.ObjectId(this.user_id);
      const result = await this.NotificationRepo.find(
        parseLimit,
        parsePage,
        user_id
      );
      return result;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }

      new GlobalErrorHandler("Something went wrong", "Unknown", "500", false);
    }
  }
}
