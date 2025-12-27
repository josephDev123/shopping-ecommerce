import { UserInterface } from "@/app/api/register/model/User";
import { Model, Schema } from "mongoose";

export class UserRepo {
  constructor(private readonly db: Model<UserInterface>) {}

  async create(query: Object) {
    const UserDoc = new this.db(query);
    return await UserDoc.save();
  }
  async findByEmail(email: string) {
    return this.db.findOne({ email: email });
  }
}
