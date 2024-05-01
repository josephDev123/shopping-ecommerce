import BrowserProductRange from "./homeComponents/BrowserProductRange";
import Hero from "./homeComponents/Hero";
import { productCategory } from "../data/productCategory";
import OurProducts from "./homeComponents/OurProducts";
import { productCardData } from "../data/productCardData";

export default function page() {
  return (
    <section className="">
      <Hero />
      {/* use server pagination here */}
      <BrowserProductRange data={productCategory} />
      <OurProducts data={productCardData} />
    </section>
  );
}
