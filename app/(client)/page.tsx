import { Suspense } from "react";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";
import { CustomFetch } from "../serverActions/customFetch";
import { getCategory } from "../serverActions/fetchCategories";
import { getPaginateProducts } from "../serverActions/fetchPaginateProducts";

export const dynamic = "force-dynamic";

export default async function page() {
  const [category, products] = await Promise.all([
    // getCategory(),
    CustomFetch({
      url: `${process.env.SERVER_BASEURL}/api/category?page=1&limit=3`,
    }),
    CustomFetch({
      url: `${process.env.SERVER_BASEURL}/api/product/products-paginate?page=1&limit=6`,
    }),
    // getPaginateProducts(),
  ]);

  return (
    <section className="">
      <Hero />
      {/* {JSON.stringify(process.env.NEXT_PUBLIC_BASEURL, null, 2)} */}
      <BrowserProductRange data={category.data?.categoriesGroup} />

      <OurProducts data={products.data?.products} />
    </section>
  );
}
