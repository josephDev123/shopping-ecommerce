import { startDb } from "@/lib/startDb";
import { ContactService } from "../service/ContactService";
import ContactModel, { IContact } from "@/models/ContactModel";
import { ContactRepo } from "../repository/ContactRepo";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await startDb();
    const ContactRepoImpl = new ContactRepo(ContactModel);
    const ContactServiceImp = new ContactService(ContactRepoImpl);

    const payload: Partial<IContact> = await request.json();
    // console.log(payload);

    const contact = await ContactServiceImp.createContact(payload);

    return SuccessApiResponseHelper(
      "contact created successfully",
      "ContactCreated",
      false,
      "success",
      200,
      ""
    );
  } catch (error) {
    const CustomError = error as GlobalErrorHandler;
    return ApiResponseHelper(
      CustomError.message,
      CustomError.name,
      false,
      "error",
      500
    );
  }
}
