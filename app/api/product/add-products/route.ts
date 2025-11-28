import { NextResponse } from "next/server";
import { ProductService } from "../services/ProductService";
import { ProductRepository } from "../repository/ProductRepository";
import { startDb } from "@/lib/startDb";
import ProductModel from "@/models/ProductsModel";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import {
  GlobalErrorHandler,
  GlobalErrorHandlerType,
} from "@/app/utils/globarErrorHandler";

export async function POST(req: Request) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);

    const formData = await req.formData();
    const files = formData.getAll("productImgUrl");

    if (files.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const payload = Object.fromEntries(
      formData.entries()
    ) as unknown as ProductSchemaTypes;

    const result = await ProductServiceImpl.create(payload, files);

    return NextResponse.json(
      { message: "Product added Successful" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.message,
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
