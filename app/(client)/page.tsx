import ProductCardLoading from "./generic/ProductLoading";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";

async function getCategory() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/category?page=1&limit=8}`
    );
    console.log(response);
    if (!response.ok) {
      // Handle errors
      console.error("Failed to fetch data:", response.statusText);
      // return <div>Error fetching data</div>;
      return `Failed to fetch  category data:  ${response.statusText}`;
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return `Failed to fetch data:  ${error}`;
  }
}

async function getPaginateProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=1&limit=4`
    );

    if (!response.ok) {
      // console.error("Failed to fetch data:", response.statusText);
      return `Failed to fetch products data:, ${response.statusText}`;
      // return <div>Error fetching data</div>;
    }
    // console.log(response.status);
    return response.json();
  } catch (error) {
    return `Failed to fetch products data:, ${error}`;
  }
}

export default async function page() {
  const categoryResult = getCategory();
  const paginateProductsResult = getPaginateProducts();

  const [category, products] = await Promise.all([
    categoryResult,
    paginateProductsResult,
  ]);

  console.log("category:", category);
  console.log("product:", paginateProductsResult);

  return (
    <section className="">
      <Hero />
      {/* <ProductCardLoading /> */}

      <BrowserProductRange data={category} />
      <OurProducts data={products} />
    </section>
  );
}
