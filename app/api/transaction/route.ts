import { startDb } from "@/lib/startDb";
import { NextRequest } from "next/server";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { TransactionService } from "../service/transactionService";
import { transactionRepository } from "../repository/TransactionRepository";
import { TransactionModel } from "@/models/TransactionModel";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await startDb();
    const TransactionReposInit = new transactionRepository(TransactionModel);
    const TransactionServiceInit = new TransactionService(TransactionReposInit);
    const params = req.nextUrl.searchParams;
    const user_id = params.get("user_id") || "";

    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 4;
    // console.log(params);

    const transaction = await TransactionServiceInit.findByPaginate(
      user_id,
      page,
      limit
    );
    console.log(transaction);
    return SuccessApiResponseHelper(
      "Transaction successful",
      "TransactionSuccess",
      false,
      "success",
      200,
      transaction
    );
  } catch (error) {
    const errorObj = error as GlobalErrorHandler;
    if (errorObj.operational) {
      console.log(errorObj?.msg);
      return ApiResponseHelper(
        "something went wrong",
        "transactionError",
        true,
        "error",
        400
      );
    } else {
      console.log(errorObj?.msg);
      return ApiResponseHelper(
        errorObj.msg,
        "transactionError",
        false,
        "error",
        400
      );
    }
  }
}
