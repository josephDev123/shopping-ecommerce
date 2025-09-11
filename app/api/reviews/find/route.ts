import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "../../service/ReviewService";
import { ReviewRepo } from "../../repository/ReviewRepo";
import { ReviewModel } from "@/models/Review";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import { startDb } from "@/lib/startDb";

export type IReviewArg = {
  productId: string;
  rating: number;
  userId: string;
  content: string;
};

async function Find(req: NextRequest) {
  try {
    await startDb();
    const reviewRepoDep = new ReviewRepo(ReviewModel);
    const reviewServiceImpl = new ReviewService(reviewRepoDep);
    const params = req.nextUrl.searchParams;
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) | 5;
    const productId = params.get("productId") || null;

    const result = await reviewServiceImpl.handleFindReviews(
      page,
      limit,
      productId!
    );
    return NextResponse.json(
      { data: result, msg: "Fetch reviews  successful" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.msg,
        error.name,
        error.operational,
        "error",
        Number(error.code)
      );
    }
    if (error instanceof Error) {
      return ApiResponseHelper(error.message, error.name, false, "error", 500);
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

export const GET = Find;
