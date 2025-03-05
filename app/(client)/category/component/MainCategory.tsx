import { ProductDataType } from "@/app/types/productsType";
import ProductCard from "../../generic/ProductCard";

interface IMainCategory {
  item: ProductDataType[];
  categoryLabel: string;
}

export default function MainCategory({ item, categoryLabel }: IMainCategory) {
  return (
    <section className="h-full w-full ">
      <h1 className="font-semibold">
        {categoryLabel} ({item.length})
      </h1>

      <div className="grid xl:grid-cols-4  sm:grid-cols-2 grid-cols-1  gap-4 my-6 ">
        {Array.isArray(item) && item?.length < 0 && (
          <small className="text-sm text-red-400">No data</small>
        )}

        {Array.isArray(item) && item?.length > 0 && (
          <>
            {item.map((item: ProductDataType) => (
              <ProductCard key={item._id} credential={item} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
