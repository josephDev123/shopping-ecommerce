import { startDb } from "@/lib/startDb";
import { OrderRepository } from "../../repository/OrderRepository";
import { OrderService } from "../../service/OrderService";
import OrderModel from "@/models/OrderModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await startDb();
    const OrderReposInit = new OrderRepository(OrderModel);
    const OrderServiceInit = new OrderService(OrderReposInit);
    // const searchParams = req.nextUrl.searchParams;

    // const id = searchParams.get("id") as string;
    // const filterByDate = searchParams.get("date") as string;
    // const page = Number(searchParams.get("page"));
    const id = "5";
    const filterByDate = "30-07-24";
    const page = 2;
    const response = await OrderServiceInit.findByPaginate(
      id,
      filterByDate,
      page
    );

    return NextResponse.json({ greeting: "hello world" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
