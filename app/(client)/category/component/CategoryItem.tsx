"use client";

import { ProductDataType } from "@/app/types/productsType";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export interface ICategoryItemProps {
  _id: string;
  products: ProductDataType[];
}

type ICategoryProps = ICategoryItemProps[];

export default function CategoryItem({
  category,
}: {
  category: ICategoryProps;
}) {
  const queryParam = useSearchParams();
  const group = queryParam.get("group");

  const decodedGroup = group ? decodeURIComponent(group) : "";
  return (
    <section className="flex flex-col space-y-2 justify-start items-start">
      {category.length < 1 ? (
        <div className="h-36 w-full"> No Category</div>
      ) : (
        category.map((categoryItem, i) => (
          <Link
            href={`?group=${encodeURIComponent(categoryItem._id)} `}
            className={`font-medium ${
              group === categoryItem._id ? "text-green-500 font-bold" : ""
            }`}
            key={i}
          >
            {categoryItem._id}
          </Link>
        ))
      )}
    </section>
  );
}
