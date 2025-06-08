import { startDb } from "@/lib/startDb";
import { NextRequest, NextResponse } from "next/server";
import { NotificationRepo } from "../repository/NotificationRepo";
import { NotificationModel } from "@/models/Notification";
import { Notification } from "../service/Notification";
import { myCommerceQueue } from "@/lib/BullMq/OrderQueue";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await startDb();
    const NotificationRepoImpl = new NotificationRepo(NotificationModel);
    const payloadQuery = req.nextUrl.searchParams;
    const id = payloadQuery.get("user_id");
    const limit = Number(payloadQuery.get("limit")) ?? 0;
    const page = Number(payloadQuery.get("page")) ?? 0;
    const NotificationServiceImpl = new Notification(
      myCommerceQueue,
      NotificationRepoImpl,
      id!
    );

    const result = NotificationServiceImpl.get(limit, page);
    return SuccessApiResponseHelper(
      "Notification successful",
      "Notification",
      true,
      "success",
      200,
      result
    );
  } catch (error) {
    if (error instanceof GlobalErrorHandler) {
      if (error.operational) {
        return ApiResponseHelper(
          "something went wrong",
          "NotificationError",
          true,
          "error",
          400
        );
      } else {
        return ApiResponseHelper(
          error.msg,
          "NotificationError",
          false,
          "error",
          400
        );
      }
    }

    return ApiResponseHelper(
      "something went wrong",
      "NotificationError",
      false,
      "error",
      400
    );
  }
}
