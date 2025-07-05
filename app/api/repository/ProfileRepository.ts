import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { IProfileSchema } from "@/models/Profile";
import { UserInterface } from "@/models/User";
import { Model } from "mongoose";

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

  async handleUpdateProfile(
    userId: string,
    userPayload: { name: string },
    profile: IProfileSchema
  ) {
    try {
      type IResult = {
        img: string;
        dob: Date;
        phone: string;
        gender: string;
        name?: string;
      };
      let result: IResult;
      const isProfile = await this.findProfileByUserId(userId);
      const profileUpdate: Partial<IProfileSchema> = {
        user_id: profile.user_id || isProfile?.user_id,
        img: profile.img || isProfile?.img || "",
        dob: profile.dob || isProfile?.dob,
        phone: profile.phone || isProfile?.phone!,
        gender: profile.gender || isProfile?.gender!,
      };
      if (!userPayload.name) {
        const profileResult = await this.updateProfile(userId, profileUpdate);
        result = {
          img: profileResult?.img!,
          dob: profileResult?.dob!,
          phone: profileResult?.phone!,
          gender: profileResult?.gender!,
        };
      } else {
        const [data, profile] = await Promise.all([
          this.updateUserColumnNameById(userId, userPayload),
          this.updateProfile(userId, profileUpdate),
        ]);
        result = {
          img: profile?.img!,
          dob: profile?.dob!,
          phone: profile?.phone!,
          gender: profile?.gender!,
          name: data?.name,
        };
        return;
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      new GlobalErrorHandler("something went wrong", "Unknown", "500", false);
    }
  }
}
