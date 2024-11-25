import { startDb } from "@/lib/startDb";
import { TextSearchService } from "../service/textSearchService";
import { TextSearchRepo } from "../repository/TextSearchRepo";
import ProductModel from "@/models/ProductsModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await startDb();
    const TextSearchRepoImpl = new TextSearchRepo(ProductModel);
    const TextSearchServiceImpl = new TextSearchService(TextSearchRepoImpl);
    const body = await req.json();
    console.log("from body", body);
    const text = body.search;
    const page = 1;
    const limit = 5;
    const response = await TextSearchServiceImpl.searchImpl(text, page, limit);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}