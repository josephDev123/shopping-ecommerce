import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { INotification } from "@/app/api/notification/model/Notification";
import mongoose, { Model } from "mongoose";
import { INotification as INotificationType } from "@/app/types/NotificationType";

export class NotificationRepo {
  constructor(private readonly NotificationModel: Model<INotification>) {}

  async create(data: Omit<INotificationType, "_id">) {
    try {
      // const createQuery = await this.NotificationModel.create(data);
      const NotificationInit = new this.NotificationModel({
        label: data.label,
        type: data.type,
        from: new mongoose.Types.ObjectId(data.from),
        to: new mongoose.Types.ObjectId(data.to),
        link: data.link,
        metadata: data.metadata,
      });

      const Notification = await NotificationInit.save();
      return Notification;
    } catch (error) {
      if (error instanceof Error)
        throw new GlobalErrorHandler(error.message, "Unknown", "500", true);
    }
  }
  async find(limit: number, page: number, user_id: mongoose.Types.ObjectId) {
    try {
      const skip = Number(page - 1) * limit;
      console.log("skip", skip);
      const result = await this.NotificationModel.find({
        to: user_id,
      })
        .limit(limit)
        .skip(skip);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "500", true);
      }
      throw new GlobalErrorHandler(
        new Error(String(error)).message,
        "Unknown",
        "500",
        true
      );
    }
  }
  async update(notification_id: string) {
    try {
      const editQuery = await this.NotificationModel.updateOne(
        { _id: notification_id },
        {
          $set: {
            read: true,
          },
        }
      );

      return editQuery;
    } catch (error) {
      if (error instanceof Error)
        throw new GlobalErrorHandler(error.message, "Unknown", "500", true);
    }
  }
}
