import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";

export class DashboardService {
  constructor(private readonly dashboardOverviewRepo: DashboardOverviewRepo) {}
  async getDashboard(user_id: string) {
    try {
      const result = await this.dashboardOverviewRepo.getDashboardStats(
        user_id
      );
      return result;
    } catch (error) {}
  }
}
