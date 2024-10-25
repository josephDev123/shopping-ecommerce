import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";

async function getCategory() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/category/categories?limit=8`
    );

    if (!response.ok) {
      // Handle errors
      console.error("Failed to fetch data:", response.statusText);
      // return <div>Error fetching data</div>;
      throw new Error(`Failed to fetch data:  ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // throw new Error(`Failed to fetch data:  ${error}`);
  }
}

async function getPaginateProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=1&limit=4`
    );

    if (!response.ok) {
      // console.error("Failed to fetch data:", response.statusText);
      throw new Error(`Failed to fetch data:, ${response.statusText}`);
      // return <div>Error fetching data</div>;
    }
    // console.log(response.status);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

export default async function page() {
  const categoryResult = getCategory();
  const paginateProductsResult = getPaginateProducts();

  const [category, products] = await Promise.all([
    categoryResult,
    paginateProductsResult,
  ]);

  console.log(categoryResult, paginateProductsResult);

  return (
    <section className="">
      <Hero />
      <BrowserProductRange data={category} />
      <OurProducts data={products} />
    </section>
  );
}
