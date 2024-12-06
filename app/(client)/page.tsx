import { Suspense } from "react";
import ProductCardLoading from "./generic/ProductLoading";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";
import Loading from "./generic/ComponentLoading";

async function getCategory() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/category?page=1&limit=8}`
  );
  console.log(response);
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    <div className="flex flex-col h-56 justify-center items-center ">
      Failed to fetch category data: {response.statusText}
    </div>;
  }

  const result = await response.json();
  return result.data?.categoriesGroup;
}

async function getPaginateProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=1&limit=4`
  );

  if (!response.ok) {
    // console.error("Failed to fetch data:", response.statusText);
    return (
      <div className="flex flex-col h-56 justify-center items-center ">
        Error fetching data
      </div>
    );
  }

  return response.json();
}

export default async function page() {
  const categoryResult = getCategory();
  const paginateProductsResult = getPaginateProducts();

  const [category, products] = await Promise.all([
    categoryResult,
    paginateProductsResult,
  ]);

  // console.log("category:", category);
  // console.log("product:", paginateProductsResult);

  return (
    <section className="">
      <Hero />
      {/* <ProductCardLoading /> */}
      <Suspense fallback={<Loading />}>
        <BrowserProductRange data={category} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <OurProducts data={products.data?.products} />
      </Suspense>
    </section>
  );
}
