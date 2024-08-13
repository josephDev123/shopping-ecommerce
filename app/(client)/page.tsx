import { Suspense } from "react";
import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import OurProducts from "./homeComponents/OurProducts";

async function getCategory() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/category/categories?limit=8`
  );

  if (!response.ok) {
    // Handle errors
    console.error("Failed to fetch data:", response.statusText);
    return <div>Error fetching data</div>;
  }

  return response.json();
}

async function getProduct() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products?limit=8`
  );

  if (!response.ok) {
    // Handle errors
    console.error("Failed to fetch data:", response.statusText);
    return <div>Error fetching data</div>;
  }

  return response.json();
}

export default async function page() {
  const categoryResult = getCategory();
  const productsResult = getProduct();

  const [category, products] = await Promise.all([
    categoryResult,
    productsResult,
  ]);

  return (
    <section className="">
      <Hero />
      <BrowserProductRange data={category} />
      <OurProducts data={products} />
    </section>
  );
}
