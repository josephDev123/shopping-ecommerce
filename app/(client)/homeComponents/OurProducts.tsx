import { IproductCardTypes } from "@/app/data/productCardData";
import ProductCard from "../generic/ProductCard";

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
    </section>
  );
}
