import { NextRequest, NextResponse } from "next/server";
import { startDb } from "@/lib/startDb";
import { categoryRepository } from "../../repository/CategoryRepo";
import { categoryService } from "../../service/CategoryService";
import OrderModel from "@/models/OrderModel";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const CategoryRepoImpl = new categoryRepository(OrderModel);
    const CategoryServiceImpl = new categoryService(CategoryRepoImpl);
    const user_id = new URL(req.url).searchParams.get("user_id") as string;
    const page = Number(new URL(req.url).searchParams.get("page")) ?? 1;
    const limit = Number(new URL(req.url).searchParams.get("limit")) ?? 5;
    console.log(user_id, page, limit);
    const response = await CategoryServiceImpl.getCategoriesByPaginate(
      page,
      limit,
      user_id
    );

    return NextResponse.json(
      { msg: "category successful", data: response },
      { status: 200 }
    );

    // return SuccessApiResponseHelper(
    //   String(response?.msg),
    //   String(response?.name),
    //   Boolean(response?.operational),
    //   String(response?.type),
    //   Number(response?.status) ?? 200,
    //   response?.data
    // );
  } catch (error) {
    const errorObj = error as GlobalErrorHandler;
    return ApiResponseHelper(
      errorObj.message,
      "CategoryError",
      true,
      "error",
      500
    );
  }
}
