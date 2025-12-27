import mongoose, { model, models, Schema, Types } from "mongoose";
import UserModel from "../../register/model/User";

export interface INotification extends Document {
  label: string;
  type: string;
  from: mongoose.ObjectId;
  to: mongoose.ObjectId;
  read: boolean;
  link?: string;
  metadata?: Record<string, any>;
}

export const NotificationSchema = new Schema<INotification>({
  label: { type: String, required: true },
  type: {
    type: String,
  },
  from: {
    type: Types.ObjectId,
    ref: UserModel,
  },
  to: {
    type: Types.ObjectId,
    ref: UserModel,
  },
  link: String,
  read: { type: Boolean, default: false },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

export const NotificationModel =
  models.Notification ||
  model<INotification>("Notification", NotificationSchema);
