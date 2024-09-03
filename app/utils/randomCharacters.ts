export function generateUniquePaymentID(userID = "") {
  const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
  const randomChars = Math.random().toString(36).substring(2, 10); // Generate random characters
  const uniqueID = `${userID}-${timestamp}-${randomChars}`; // Combine them

  return uniqueID;
}
