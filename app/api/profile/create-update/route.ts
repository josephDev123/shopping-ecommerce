import { NextRequest } from "next/server";
import { profileService } from "../../service/ProfileService";
import { ProfileRepo } from "../../repository/ProfileRepository";
import UserModel from "@/models/User";
import ProfileModel from "@/models/Profile";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";

async function CreateUpdateProfile(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const userDataPayload = body.userPayload;
    const profileData = body.profile;

    const profileRepoImpl = new ProfileRepo(UserModel, ProfileModel);
    const profileServiceImpl = new profileService(profileRepoImpl);
    const result = await profileServiceImpl.update(
      userId,
      profileData,
      userDataPayload
    );

    return SuccessApiResponseHelper(
      "profile updated",
      "ProfileSuccess",
      true,
      "success",
      200,
      result
    );
  } catch (error) {
    const errorObj = error as GlobalErrorHandler;
    if (errorObj.operational) {
      return ApiResponseHelper(
        errorObj.message,
        errorObj.name,
        true,
        "error",
        400
      );
    } else {
      return ApiResponseHelper(
        errorObj.message,
        "ProfileError",
        false,
        "error",
        400
      );
    }
  }
}

export const PATCH = CreateUpdateProfile;
