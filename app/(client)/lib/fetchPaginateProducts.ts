export async function getPaginateProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=1&limit=4`
  );

  if (!response.ok) {
    throw new Error(`Error fetching data`);
  }

  return response.json();
}
