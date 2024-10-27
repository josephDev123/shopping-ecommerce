import { startDb } from "@/lib/startDb";
import { NextRequest } from "next/server";
import { CustomerRepo } from "../repository/CustomerRepo";
import OrderModel from "@/models/OrderModel";
import { CustomerService } from "../service/CustomerServices";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const CustomerReposInit = new CustomerRepo(OrderModel);
    const CustomerServiceInit = new CustomerService(CustomerReposInit);
    const params = new URL(req.url).searchParams;
    const user_id = params.get("user_id") || "";
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 4;
    // console.log(params);

    const response = await CustomerServiceInit.findByPaginate(
      user_id,
      page,
      limit
    );
    console.log(response);
    return SuccessApiResponseHelper(
      "customer successful",
      "CustomerSuccess",
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
        "CustomerError",
        true,
        "error",
        400
      );
    } else {
      return ApiResponseHelper(
        errorObj.msg,
        "CustomerError",
        false,
        "error",
        400
      );
    }
  }
}
