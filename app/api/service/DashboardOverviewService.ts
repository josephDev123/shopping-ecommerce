import { DashboardOverviewRepo } from "../repository/DashboardOverviewRepo";

export class DashboardService {
  constructor(private readonly dashboardOverviewRepo: DashboardOverviewRepo) {}
  async find() {}
}
