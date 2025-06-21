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
    const text = body.search;
    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Search text cannot be empty" },
        { status: 400 }
      );
    }
    const page = 1;
    const limit = 5;
    const response = await TextSearchServiceImpl.searchImpl(text, page, limit);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    // console.log(error);
    NextResponse.json({ error: error }, { status: 500 });
    return;
  }
}
