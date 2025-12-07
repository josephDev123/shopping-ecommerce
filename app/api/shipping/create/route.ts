import { NextRequest, NextResponse } from "next/server";
import { ShippingService } from "../service/ShippingService";
import { ShippingRepo } from "../repository/ShippingRepo";
import { ShippingModel } from "../model/Shiping";
import { IShipping } from "../zod/ShippingSchema";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { startDb } from "@/lib/startDb";
import { Session } from "next-auth";

async function createShippingHandler(req: NextRequest) {
  try {
    await startDb();
    const user = req.session as unknown as Session;
    const ShippingRepoInit = new ShippingRepo(ShippingModel);
    const ShippingServiceInit = new ShippingService(ShippingRepoInit, user!);
    const body = await req.json();

    const payload: IShipping = body;
    const result = await ShippingServiceInit.create(payload);

    return NextResponse.json(
      { msg: "Shipping created", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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

export const POST = createShippingHandler;
