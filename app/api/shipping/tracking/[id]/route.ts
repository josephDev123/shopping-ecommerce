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
  { params }: { params: { id: string } }
) {
  try {
    const user = req.session as unknown as Session;
    const ShippingRepoInit = new ShippingRepo(ShippingModel);
    const ShippingServiceInit = new ShippingService(ShippingRepoInit, user!);
    const query = params.id as unknown as Types.ObjectId;
    const payload = await req.json();
    const progressStatus = payload.status;
    console.log("Tracking progressStatus:", progressStatus);
    console.log("Tracking query ID:", query);
    const result = await ShippingServiceInit.UpdateProgress(
      query,
      progressStatus
    );

    return NextResponse.json(
      { message: "Tracking updated successfully" },
      { status: 200 }
    );
    // data: result
  } catch (error) {
    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.operational ? error.message : "Something went wrong",
        error.name,
        error.operational,
        "error",
        Number(error.code)
      );
    }
    if (error instanceof Error) {
      return ApiResponseHelper(
        "Something went wrong",
        error.name,
        false,
        "error",
        500
      );
    }

    return ApiResponseHelper(
      "Something went wrong",
      "UnknownError",
      false,
      "error",
      500
    );
  }
}

export const PATCH = RouteHandlerMiddleware(TrackProgress);
