import { startDb } from "@/lib/startDb";
import { NextRequest, NextResponse } from "next/server";
import { DashboardService } from "../service/DashboardOverviewService";
import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";
import OrderModel from "@/models/OrderModel";

export async function GET(req: NextRequest) {
  await startDb();
  try {
    const payload = req.nextUrl.searchParams;
    const user_id = payload.get("user_id")!;

    const DashboardOverviewRepoImpl = new DashboardOverviewRepo(OrderModel);
    const DashboardOverviewServiceImpl = new DashboardService(
      DashboardOverviewRepoImpl
    );
    const result = await DashboardOverviewServiceImpl.getDashboard(user_id);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return Response.json(`${error}`, { status: 500 });
  }
}
