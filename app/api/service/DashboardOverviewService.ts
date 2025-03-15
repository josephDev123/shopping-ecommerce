import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";

export class DashboardService {
  constructor(private readonly dashboardOverviewRepo: DashboardOverviewRepo) {}
  async getDashboard(user_id: string) {
    try {
      const result = await this.dashboardOverviewRepo.getDashboardStats(
        user_id
      );
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof GlobalErrorHandler) {
        return new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }

      if (error instanceof Error) {
        return new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      return new GlobalErrorHandler(
        "something went wrong",
        "ServerError",
        "500",
        false
      );
    }
  }
}
