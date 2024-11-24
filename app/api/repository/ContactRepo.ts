import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { IContact } from "@/models/ContactModel";
import { Model } from "mongoose";

export class ContactRepo {
  constructor(private readonly ContactModel: Model<IContact>) {}

  async create(data: Partial<IContact>) {
    try {
      //   console.log(data);
      const contact = new this.ContactModel(data);
      await contact.save();
      return;
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.message,
        CustomError.name,
        "500",
        false
      );
    }
  }
}
