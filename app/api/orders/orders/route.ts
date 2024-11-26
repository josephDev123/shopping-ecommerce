import { startDb } from "@/lib/startDb";
import { OrderRepository } from "../../repository/OrderRepository";
import { OrderService } from "../../service/OrderService";
import OrderModel from "@/models/OrderModel";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const OrderReposInit = new OrderRepository(OrderModel);
    const OrderServiceInit = new OrderService(OrderReposInit);
    const params = new URL(req.url).searchParams;
    const user_id = params.get("user_id") || "";
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 4;
    // console.log(params);

    const response = await OrderServiceInit.findByPaginate(
      user_id,
      page,
      limit
    );
    // console.log(response);
    return SuccessApiResponseHelper(
      "order successful",
      "OrderSuccess",
      false,
      "success",
      200,
      response
    );
  } catch (error) {
    const errorObj = error as GlobalErrorHandler;
    if (errorObj.operational) {
      return ApiResponseHelper(
        "something went wrong",
        "OrderError",
        true,
        "error",
        400
      );
    } else {
      return ApiResponseHelper(errorObj.msg, "OrderError", false, "error", 400);
    }
  }
}
