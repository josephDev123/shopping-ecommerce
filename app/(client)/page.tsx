import { Suspense } from "react";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";
import Loading from "./generic/ComponentLoading";
import { getCategory } from "./lib/fetchCategories";
import { getPaginateProducts } from "./lib/fetchPaginateProducts";

export default async function page() {
  const [category, products] = await Promise.all([
    getCategory(),
    getPaginateProducts(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <section className="">
        <Hero />

        <BrowserProductRange data={category} />

        <OurProducts data={products.data?.products} />
      </section>
    </Suspense>
  );
}
