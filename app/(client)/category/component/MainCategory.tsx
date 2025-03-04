import { ProductDataType } from "@/app/types/productsType";

interface IMainCategory {
  item: ProductDataType[];
  categoryLabel: string;
}

export default function MainCategory({ item, categoryLabel }: IMainCategory) {
  return (
    <section className="h-full w-full">
      <h1 className="font-semibold">
        {categoryLabel} ({item.length})
      </h1>

      {JSON.stringify(item)}
    </section>
  );
}
