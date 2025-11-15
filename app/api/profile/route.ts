import { NextRequest } from "next/server";
import { profileService } from "../service/ProfileService";
import { ProfileRepo } from "../repository/ProfileRepository";
import UserModel from "@/models/User";
import ProfileModel from "@/models/Profile";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";

async function Profile(req: NextRequest) {
  try {
    const profileRepoImpl = new ProfileRepo(UserModel, ProfileModel);
    const profileServiceImpl = new profileService(profileRepoImpl);
    const query = req.nextUrl.searchParams;
    const userId = query.get("userId") || "";
    // console.log(userId);

    const result = await profileServiceImpl.find(userId);

    return SuccessApiResponseHelper(
      "profile successful",
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

export const GET = Profile;
