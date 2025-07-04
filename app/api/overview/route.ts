import { startDb } from "@/lib/startDb";
import { NextRequest } from "next/server";
import { DashboardService } from "../service/DashboardOverviewService";
import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";
import OrderModel from "@/models/OrderModel";
import { TransactionModel } from "@/models/TransactionModel";
import { RouteHandlerMiddleware } from "@/app/utils/RouteHandlerMiddleware";

export const dynamic = "force-dynamic";
async function Overview(req: NextRequest) {
  await startDb();
  try {
    const payload = req.nextUrl.searchParams;
    const user_id = payload.get("user_id")!;

    const DashboardOverviewRepoImpl = new DashboardOverviewRepo(
      OrderModel,
      TransactionModel
    );
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

export const GET = RouteHandlerMiddleware(Overview);
