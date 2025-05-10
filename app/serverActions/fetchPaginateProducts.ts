// "use server";

export async function getPaginateProducts() {
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/product/products-paginate?page=1&limit=6`
  );

  if (!response.ok) {
    throw new Error(`Error fetching data`);
  }

  return response.json();
}
