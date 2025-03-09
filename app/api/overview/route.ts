import { startDb } from "@/lib/startDb";
import { NextRequest } from "next/server";
import { DashboardService } from "../service/DashboardOverviewService";
import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";
import OrderModel from "@/models/OrderModel";

async function GET(req: NextRequest) {
  await startDb();
  try {
    const payload = await req.json();
    const DashboardOverviewRepoImpl = new DashboardOverviewRepo(OrderModel);
    const DashboardOverviewServiceImpl = new DashboardService(
      DashboardOverviewRepoImpl
    );
    const params = new URL(req.url).searchParams;
    const response = await DashboardOverviewServiceImpl.getDashboard(payload);
  } catch (error) {
    return;
  }
}
