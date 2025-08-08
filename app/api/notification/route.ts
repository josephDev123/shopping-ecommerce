import { startDb } from "@/lib/startDb";
import { NextRequest, NextResponse } from "next/server";
import { NotificationRepo } from "../repository/NotificationRepo";
import { NotificationModel } from "@/models/Notification";
import { Notification } from "../service/Notification";
import { myCommerceQueue } from "@/lib/BullMq/Queue";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { INotification } from "@/app/types/NotificationType";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const NotificationRepoImpl = new NotificationRepo(NotificationModel);
    const payloadQuery = req.nextUrl.searchParams;
    const userId = payloadQuery.get("user_id");
    const limit = Number(payloadQuery.get("limit")) ?? 0;
    const page = Number(payloadQuery.get("page")) ?? 0;
    const NotificationServiceImpl = new Notification(
      NotificationRepoImpl,
      userId!
    );

    const result = await NotificationServiceImpl.find(limit, page);
    return SuccessApiResponseHelper(
      "Notification successful",
      "Notification",
      true,
      "success",
      200,
      [],
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

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await startDb();
    const body = await req.json();
    const notificationId: string = body.id;
    const userId = body.userId;
    const NotificationRepoImpl = new NotificationRepo(NotificationModel);
    const NotificationService = new Notification(NotificationRepoImpl, userId);

    const result = await NotificationService.update(notificationId);
    return SuccessApiResponseHelper(
      "Notification read successful",
      "Notification",
      true,
      "success",
      200,
      [],
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
