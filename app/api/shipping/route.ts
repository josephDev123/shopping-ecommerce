import { NextRequest, NextResponse } from "next/server";
import { ShippingRepo } from "./repository/ShippingRepo";
import { ShippingService } from "./service/ShippingService";
import { ShippingModel } from "./model/Shiping";
import { startDb } from "@/lib/startDb";
import { ApiResponseHelper } from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { RouteHandlerMiddleware } from "@/app/utils/RouteHandlerMiddleware";
import { Session } from "next-auth";

async function GetShippingRoute(req: NextRequest) {
  try {
    await startDb();
    const user = req.session as unknown as Session;
    const ShippingRepoInit = new ShippingRepo(ShippingModel);
    const ShippingServiceInit = new ShippingService(ShippingRepoInit, user!);
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

    // console.log("shipping route", user);

    const result = await ShippingServiceInit.getAll(page, limit);

    return NextResponse.json(
      { msg: "Shippings fetched", data: result },
      { status: 200 }
    );
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
export const GET = RouteHandlerMiddleware(GetShippingRoute);
