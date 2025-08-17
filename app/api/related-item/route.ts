import { NextRequest, NextResponse } from "next/server";
import { RelatedItemService } from "../service/RelatedItemService";
import { RelatedItemRepo } from "../repository/RelatedItemRepo";
import ProductModel from "@/models/ProductsModel";
import { ApiResponseHelper } from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const query = req.nextUrl.searchParams;
    const skip = Number(query.get("skip")) || 0;
    const limit = Number(query.get("limit")) || 5;
    const category = query.get("category")!;
    const RelatedItemRepoImpl = new RelatedItemRepo(ProductModel);
    const RelatedItemServiceImpl = new RelatedItemService(RelatedItemRepoImpl);
    const result = await RelatedItemServiceImpl.find(skip, limit, category);
    return NextResponse.json(
      { message: "related item successful", data: result },
      { status: 200 }
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
