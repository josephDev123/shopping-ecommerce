"use server";

export async function getPaginateProducts() {
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/product/products-paginate?page=1&limit=6`,
    {
      next: {
        revalidate: 6 * 10,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching data`);
  }

  return await response.json();
}
