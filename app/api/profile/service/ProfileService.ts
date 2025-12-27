import { IProfileSchema } from "@/app/api/profile/model/Profile";
import { ProfileRepo } from "../repository/ProfileRepository";
import z from "zod";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class profileService {
  constructor(private readonly profileRepo: ProfileRepo) {}
  validatePayload(
    userId: string,
    profile: IProfileSchema,
    userPayload?: { name: string }
  ) {
    const validate = z.object({
      userId: z.string(),
      userPayload: z
        .object({
          name: z.string(),
        })
        .optional(),
      profile: z.object({
        user_id: z.string().optional(),
        img: z.string().optional(),
        dob: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
            message: "Date must be in DD/MM/YYYY format",
          })
          .optional(),

        phone: z.string().optional(),
        gender: z.string().optional(),
      }),
    });

    return validate.safeParse({ userId, userPayload, profile });
  }
  async update(
    userId: string,
    profile: IProfileSchema,
    userPayload?: { name: string }
  ) {
    try {
      const isvalidate = this.validatePayload(userId, profile, userPayload);
      if (!isvalidate.success) {
        const fieldErrors = isvalidate.error.flatten().fieldErrors;

        console.log("flat", fieldErrors);

        // Collect all error messages into one array
        const messages = Object.values(fieldErrors)
          .flat()
          .filter(Boolean) as string[];
        throw new GlobalErrorHandler(
          "ValidateError",
          messages.join(", "),
          "400",
          true
        );
      }
      console.log(userId, userPayload);
      const updateResult = await this.profileRepo.handleUpdateProfile(
        userId,
        profile,
        userPayload
      );
      return updateResult;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        throw error;
      }
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

  async find(userId: string) {
    try {
      const findProfile = await this.profileRepo.find(userId);
      return findProfile;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        throw error;
      }
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
