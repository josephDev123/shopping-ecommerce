import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { IProfileSchema } from "@/app/api/profile/model/Profile";
import { UserInterface } from "@/app/api/register/model/User";
import mongoose, { Model } from "mongoose";

type IResult = {
  img: string;
  dob: Date;
  phone: string;
  gender: string;
  name?: string;
};
export class ProfileRepo {
  constructor(
    private readonly User: Model<UserInterface>,
    private readonly Profile: Model<IProfileSchema>
  ) {}

  async updateUserColumnNameById(id: string, updatePayload: { name: string }) {
    try {
      const result = await this.User.findByIdAndUpdate(
        id,
        { $set: { name: updatePayload.name } },
        { new: true } // return the updated document
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      new GlobalErrorHandler("something went wrong", "Unknown", "500", false);
    }
  }

  async updateProfile(user_id: string, updatePayload: Partial<IProfileSchema>) {
    try {
      const result = await this.Profile.findOneAndUpdate(
        { user_id: user_id },
        { $set: updatePayload },
        { new: true, upsert: true }
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      new GlobalErrorHandler("something went wrong", "Unknown", "500", false);
    }
  }

  async findProfileByUserId(userId: string) {
    try {
      const result = await this.Profile.findOne({
        user_id: userId,
      });
      return result;
    } catch (error) {}
  }

  //create or update profile/user handler
  async handleUpdateProfile(
    userId: string,
    profile: IProfileSchema,
    userPayload?: { name: string }
  ) {
    try {
      let result: IResult;
      const isProfile = await this.findProfileByUserId(userId);
      const profileUpdate: Partial<IProfileSchema> = {
        user_id: profile.user_id || isProfile?.user_id,
        img: profile.img || isProfile?.img || "",
        dob: profile.dob || isProfile?.dob,
        phone: profile.phone || isProfile?.phone!,
        gender: profile.gender || isProfile?.gender!,
      };
      if (!userPayload?.name) {
        const profileResult = await this.updateProfile(userId, profileUpdate);
        result = {
          img: profileResult?.img!,
          dob: profileResult?.dob!,
          phone: profileResult?.phone!,
          gender: profileResult?.gender!,
        };
      } else {
        if (!userPayload?.name) {
          throw new GlobalErrorHandler(
            "Name is required to update user",
            "ValidationError",
            "400",
            false
          );
        }
        const [data, profile] = await Promise.all([
          this.updateUserColumnNameById(userId, { name: userPayload.name }),
          this.updateProfile(userId, profileUpdate),
        ]);
        result = {
          img: profile?.img!,
          dob: profile?.dob!,
          phone: profile?.phone!,
          gender: profile?.gender!,
          name: data?.name,
        };
        return result;
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      throw new GlobalErrorHandler(
        "something went wrong",
        "Unknown",
        "500",
        false
      );
    }
  }

  //fetch profile handler
  async find(userId: string) {
    try {
      // const profile = await this.Profile.find({ user_id: userId });
      const userWithProfile = await this.User.findById({
        _id: new mongoose.Types.ObjectId(userId),
      })
        .populate({
          path: "profile",
          strictPopulate: false,
        })
        .exec();
      console.log(userWithProfile);

      return userWithProfile?.toObject({ virtuals: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      throw new GlobalErrorHandler(
        "something went wrong",
        "Unknown",
        "500",
        false
      );
    }
  }
}
