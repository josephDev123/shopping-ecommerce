"use  server";

export async function getCategory() {
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/category?page=1&limit=8`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch category data: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}
