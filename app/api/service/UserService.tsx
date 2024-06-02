import { UserInterface } from "@/models/User";
import { Model } from "mongoose";
import { UserRepo } from "../repository/UserRepo";

export class UserService {
  constructor(private readonly UserRepo: UserRepo) {}

  async createService(query: Object) {
    return this.UserRepo.create(query);
  }

  async FindByEmailService(email: string) {
    return this.UserRepo.findByEmail(email);
  }
}
