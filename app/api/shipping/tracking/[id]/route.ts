import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ShippingRepo } from "../../repository/ShippingRepo";
import { ShippingService } from "../../service/ShippingService";
import { ShippingModel } from "../../model/Shiping";
import { ApiResponseHelper } from "@/app/api/utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { Types } from "mongoose";
import { RouteHandlerMiddleware } from "@/app/utils/RouteHandlerMiddleware";

async function TrackProgress(
  req: NextRequest,
  ctx: RouteContext<"/api/shipping/tracking/[id]">,
) {
  try {
    const user = req.session as unknown as Session;
    // console.log("user:", user);

    const { id } = await ctx.params;
    const shippingId = new Types.ObjectId(id);
    // console.log("Tracking query ID:", shippingId);

    // const payload = await req.json(); //for json payload
    const payload = await req.formData(); //for formData payload
    if (!payload || !payload?.get("status")) {
      throw new GlobalErrorHandler(
        "Invalid payload",
        "InvalidPayload",
        "400",
        true,
      );
    }
    // console.log(" payload:", payload);
    // const progressStatus = payload.status; for json data payload
    const progressStatus = payload.get("status"); //for formaData data payload
    console.log("Tracking progressStatus:", progressStatus);

    const ShippingRepoInit = new ShippingRepo(ShippingModel);
    const ShippingServiceInit = new ShippingService(ShippingRepoInit, user!);

    await ShippingServiceInit.UpdateProgress(
      shippingId,
      String(progressStatus),
    );

    return NextResponse.json(
      { message: "Tracking updated successfully" },
      { status: 200 },
    );
    // data: result
  } catch (error) {
    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.operational ? error.message : "Something went wrong",
        error.name,
        error.operational,
        "error",
        Number(error.code),
      );
    }
    if (error instanceof Error) {
      return ApiResponseHelper(
        "Something went wrong",
        error.name,
        false,
        "error",
        500,
      );
    }

    return ApiResponseHelper(
      "Something went wrong",
      "UnknownError",
      false,
      "error",
      500,
    );
  }
}

export const PATCH = TrackProgress;
// RouteHandlerMiddleware
