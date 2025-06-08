import GlobalError from "@/app/global-error";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { INotification } from "@/models/Notification";
import mongoose, { Model } from "mongoose";

export class NotificationRepo {
  constructor(private readonly NotificationModel: Model<INotification>) {}
  async find(limit: number, page: number, user_id: mongoose.Types.ObjectId) {
    try {
      const skip = page - 1 * limit;
      const result = await this.NotificationModel.find({
        user_id: user_id,
      })
        .limit(limit)
        .skip(skip);

      return result;
    } catch (error) {
      if (error instanceof Error)
        new GlobalErrorHandler(error.message, "Unknown", "500", true);
    }
  }
}
