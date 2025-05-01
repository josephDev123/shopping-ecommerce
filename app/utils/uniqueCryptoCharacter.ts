import crypto from "crypto";

export function generateSecureToken(
  length: number = 32,
  encoding: BufferEncoding = "hex"
): string {
  return crypto.randomBytes(length).toString(encoding);
}
