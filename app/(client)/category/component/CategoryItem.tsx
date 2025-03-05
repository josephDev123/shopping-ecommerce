"use client";

import useWindowWidthHeight from "@/app/hooks/useWidthHeight";
import { ProductDataType } from "@/app/types/productsType";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export interface ICategoryItemProps {
  _id: string;
  products: ProductDataType[];
}

type ICategoryProps = ICategoryItemProps[];

interface CategoryItemProps {
  category: ICategoryProps;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const queryParam = useSearchParams();
  const router = useRouter();
  const group = queryParam.get("group");
  const { width } = useWindowWidthHeight();
  const decodedGroup = group ? decodeURIComponent(group) : "";

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroup = e.target.value;
    router.push(`?group=${encodeURIComponent(selectedGroup)}`);
  };

  return (
    <>
      {width >= 640 ? (
        <section className="flex flex-col space-y-2 justify-start items-start">
          {category.length === 0 ? (
            <div className="h-36 w-full">No Category</div>
          ) : (
            category.map((categoryItem) => (
              <Link
                key={categoryItem._id}
                href={`?group=${encodeURIComponent(categoryItem._id)}`}
                className={`font-medium ${
                  decodedGroup === categoryItem._id
                    ? "text-green-500 font-bold"
                    : ""
                }`}
              >
                {categoryItem._id}
              </Link>
            ))
          )}
        </section>
      ) : (
        <>
          {category.length === 0 ? (
            <div className="h-36 w-full">No Category</div>
          ) : (
            <select
              className="border p-2 text-sm rounded-md"
              onChange={handleSelectChange}
            >
              <option value="">Category</option>
              {category.map((categoryItem) => (
                <option key={categoryItem._id} value={categoryItem._id}>
                  {categoryItem._id}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </>
  );
}
