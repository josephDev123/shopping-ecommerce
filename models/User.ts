import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = 10;
    // const salt = await bcrypt.genSalt(10); //also correct
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }
});

const UserModel = models.User || model<UserInterface>("User", UserSchema);
export default UserModel;
