import { models, Schema, model, Document } from "mongoose";

export interface IProfileSchema extends Document {
  user_id: Schema.Types.ObjectId | string;
  img: string;
  dob: Date;
  phone: string;
  gender: string;
}

const profileSchema = new Schema<IProfileSchema>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  img: {
    type: String,
    require: false,
  },
  dob: {
    type: Date,
    require: false,
  },
  phone: { type: String, require: false },
  gender: { type: String, require: false },
});

const Profile = models.Profile || model("Profile", profileSchema);
export default Profile;
