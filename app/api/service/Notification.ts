import { Queue } from "bullmq";
import { OrderFactoryNotification } from "../factories/NotificationFactoryBase";
import mongoose from "mongoose";
import { NotificationRepo } from "../repository/NotificationRepo";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { INotification } from "@/app/types/NotificationType";

// export type IProcessNotification = {
//   label?: string;
//   type: string;
//   from: string;
//   to: string;
//   read?: false;
//   link?: string;
//   data?: {
//     name: string;
//     price: string;
//     id: string;
//   };
// };

export class Notification {
  constructor(
    private readonly NotificationRepo: NotificationRepo,
    private readonly user_id?: string,
    private readonly OrderQueue?: Queue
  ) {}

  async create(data: Omit<INotification, "_id">) {
    try {
      OrderFactoryNotification(data, this.OrderQueue);
      const handleNotification = await this.NotificationRepo.create(data);
      return handleNotification;
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

  async find(limit: number, page: number) {
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
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "Unknown",
        "500",
        false
      );
    }
  }

  async update(notificationId: string) {
    try {
      const handleUpdate = await this.NotificationRepo.update(notificationId);
      return handleUpdate;
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
