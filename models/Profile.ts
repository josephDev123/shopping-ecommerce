import { models, Schema, model } from "mongoose";

export interface IProfileSchema extends Document {
  user_id: Schema.Types.ObjectId;
  img: string;
  dob: Date;
  phone: string;
  gender: string;
}

const profileSchema = new Schema<IProfileSchema>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  img: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
  },
  phone: String,
  gender: String,
});

export const Profile = models.Profile || model("Profile", profileSchema);
