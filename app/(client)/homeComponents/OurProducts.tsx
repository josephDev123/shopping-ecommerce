import { IproductCardTypes } from "@/app/data/productCardData";
import ProductCard from "../generic/ProductCard";
import Button from "../generic/Button";

type IOurProducts = {
  data: IproductCardTypes[];
};

export default function OurProducts({ data }: IOurProducts) {
  return (
    <section className="flex flex-col justify-center items-center my-8 w-[80%] mx-auto">
      <h1 className="font-bold text-2xl mb-4"> Our Products</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <ProductCard key={item.id} credential={item} />
        ))}
      </div>
      <Button
        textContent="Show More"
        className="mt-8 border border-[#B88E2F] px-5 py-2 font-bold text-[#B88E2F] hover:text-[#ddba6a]"
      />
    </section>
  );
}
