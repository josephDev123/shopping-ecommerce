import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import { UserInterface } from "@/models/User";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { startDb } from "@/lib/startDb";
import bcrypt from "bcrypt";
import { UserRepo } from "../repository/UserRepo";
import { UserService } from "../service/UserService";
import { ApiResponseHelper } from "../utils/ApiResponseHelper";
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
        // Response.json(
        //   {
        //     msg: "Email already taken",
        //     name: "",
        //     operational: true,
        //     type: "error",
        //   },
        //   { status: 400 }
        // );
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

          // Response.json(
          //   {
          //     msg: "password already taken",
          //     name: "",
          //     operational: true,
          //     type: "error",
          //   },
          //   { status: 400 }
          // );
        }
      }
    }

    // const userDoc = new UserModel({
    //   email: body.email,
    //   password: body.password,
    //   name: body.name,
    // });

    const UserDoc = await User_service.createService({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    // console.log(UserDoc);
    return NextResponse.json(
      { msg: "user register successful", data: "" },
      { status: 200 }
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
