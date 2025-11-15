import { ZodObject, ZodTypeAny, ZodRawShape, z } from "zod";
import { GlobalErrorHandler } from "./globarErrorHandler";

export function zodValidate<TData extends ZodRawShape, T>(
  zodObject: ZodObject<TData>,
  payload: T
) {
  const validate = zodObject.safeParse(payload);
  if (!validate.success) {
    const error = validate.error.issues.map((error) => error.message);
    throw new GlobalErrorHandler(error.toString(), "ZodError", "400", true);
  }

  return validate.data;
}
