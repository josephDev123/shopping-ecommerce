import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<UserInterface>(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = 10;
    // const salt = await bcrypt.genSalt(10); //also correct
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

// ✅ Add virtual to reverse populate Profile
UserSchema.virtual("profile", {
  ref: "Profile", // The model to use
  localField: "_id", // Link user's _id
  foreignField: "user_id", // To profile's user_id
  justOne: true, // Because it's one-to-one
});

// ✅ Enable virtuals when returning objects
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

const UserModel = models.User || model<UserInterface>("User", UserSchema);
export default UserModel;
