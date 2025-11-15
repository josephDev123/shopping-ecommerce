import { ShippingRepo } from "../repository/ShippingRepo";
import { zodValidate } from "@/app/utils/zodValidation";
import { IShipping, shippingSchema } from "../zod/ShippingSchema";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class ShippingService {
  constructor(private readonly ShippingRepo: ShippingRepo) {}

  async create(payload: IShipping) {
    try {
      const validate = zodValidate(shippingSchema, payload);
      console.log(validate);
      await this.ShippingRepo.create(validate);
      return;
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "400", false);
      }

      if (error instanceof Error) {
        throw new GlobalErrorHandler(
          "Something went wrong",
          error.name,
          "500",
          false
        );
      }
    }
  }
}
