import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "../service/ReviewService";
import { ReviewRepo } from "../repository/ReviewRepo";
import { ReviewModel } from "@/app/api/reviews/model/Review";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import { startDb } from "@/lib/startDb";

export type IReviewArg = {
  productId: string;
  rating: number;
  userId: string;
  content: string;
};

async function Create(req: NextRequest) {
  try {
    await startDb();
    const reviewRepoDep = new ReviewRepo(ReviewModel);
    const reviewServiceImpl = new ReviewService(reviewRepoDep);
    const payload = await req.json();
    const reviewPayload: IReviewArg = {
      productId: payload.productId,
      userId: payload.userId,
      content: payload.content,
      rating: payload.rating,
    };
    // console.log(reviewPayload);
    const result = await reviewServiceImpl.handleCreate(reviewPayload);
    return NextResponse.json(
      { data: result, msg: "review created successful" },
      { status: 201 }
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

export const POST = Create;
