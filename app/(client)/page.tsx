import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";
import { getCategory } from "./actions/category";
import { getPaginateProducts } from "./actions/product";

export const dynamic = "force-dynamic";

export default async function page() {
  const [category, products] = await Promise.all([
    getCategory(),
    getPaginateProducts(),
  ]);

  console.log("products", products);
  console.log("category", category);

  return (
    <section className="">
      <Hero />
      {/* {JSON.stringify(products, null, 2)} */}
      <BrowserProductRange data={category.data?.categoriesGroup} />

      <OurProducts data={products.data?.products} />
    </section>
  );
}
