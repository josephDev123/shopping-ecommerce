"use  server";

export async function getCategory() {
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/categories?page=1&limit=8`,
    {
      next: {
        revalidate: 6 * 10,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch category data`);
  }

  const result = await response.json();
  return result;
}
