"use server";

export async function fetchOrders(ArgPage: number, argLimit: number) {
  const page = Number(ArgPage) || 1;
  const limit = Number(argLimit) || 4;

  // // console.log(page, limit);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=${page}&limit=${limit}`,
    {
      next: { revalidate: 600 },
    }
  );

  const parseResult = await response.json();
  if (!response.ok) {
    // Handle errors
    console.error(`Error: ${response.status} - ${response.statusText}`);

    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return parseResult;
}
