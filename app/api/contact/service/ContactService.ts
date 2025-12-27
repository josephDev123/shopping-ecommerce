import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ContactRepo } from "../repository/ContactRepo";
import { IContact } from "@/app/api/contact/model/ContactModel";

export class ContactService {
  constructor(private readonly ContactRepo: ContactRepo) {}
  async createContact(data: Partial<IContact>) {
    try {
      const contact = await this.ContactRepo.create(data);
      return contact;
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
