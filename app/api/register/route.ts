import { NextResponse } from "next/server";
import UserModel from "@/app/api/register/model/User";
import { UserInterface } from "@/app/api/register/model/User";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { startDb } from "@/lib/startDb";
import bcrypt from "bcrypt";
import { UserRepo } from "./repository/UserRepo";
import { UserService } from "./service/UserService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
// import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await startDb();
    const User_Repo = new UserRepo(UserModel);
    const User_service = new UserService(User_Repo);

    const body = await request.json();

    const User = await User_service.FindByEmailService(body.email);
    if (User) {
      if (User?.email) {
        return ApiResponseHelper(
          "Email already taken",
          "AuthError",
          true,
          "error",
          400
        );
      } else if (User.password) {
        const isPasswordTaken = await bcrypt.compare(
          body.password,
          User.password
        );
        if (isPasswordTaken) {
          return ApiResponseHelper(
            "password already taken",
            "AuthError",
            true,
            "error",
            400
          );
        }
      }
    }

    const UserDoc = await User_service.createService({
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return SuccessApiResponseHelper(
      "user register successful",
      "AuthSuccess",
      true,
      "success",
      200,
      ""
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Something went wrong",
        name: "",
        operational: true,
        type: "error",
      },
      { status: 500 }
    );
  }
}
