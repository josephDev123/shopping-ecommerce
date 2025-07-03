// "use  server";

export async function getCategoryToFilter() {
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/category?page=1&limit=8`
  );

  if (!response.ok) {
    return ["something went wrong"];
  }

  const result = await response.json();
  return result;
}
