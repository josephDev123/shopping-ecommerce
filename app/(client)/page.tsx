import { Suspense } from "react";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";
import Loading from "./generic/ComponentLoading";
import { CustomFetch } from "../serverActions/customFetch";

export default async function page() {
  const [category, products] = await Promise.all([
    CustomFetch({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/api/category?page=1&limit=8`,
      cache: "force-cache",
    }),
    CustomFetch({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=1&limit=4`,
      cache: "force-cache",
    }),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <section className="">
        <Hero />

        <BrowserProductRange data={category.data?.categoriesGroup} />

        <OurProducts data={products.data?.products} />
      </section>
    </Suspense>
  );
}
