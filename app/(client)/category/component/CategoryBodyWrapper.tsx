"use client";

import { Suspense, useEffect, useState } from "react";
import MainCategory from "./MainCategory";
import CategoryItem, { ICategoryItemProps } from "./CategoryItem";
import { ProductDataType } from "@/app/types/productsType";
import { useSearchParams } from "next/navigation";

interface ICategoryBodyWrapper {
  categories: ICategoryItemProps[];
}

export default function CategoryBodyWrapper({
  categories,
}: ICategoryBodyWrapper) {
  const queryParam = useSearchParams();
  const group = queryParam.get("group");

  const decodedGroup = group ? decodeURIComponent(group) : "";
  console.log(decodedGroup);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(decodedGroup);

  const [selectedCategoryItem, setSelectedCategoryItem] = useState<
    ProductDataType[]
  >([]);

  useEffect(() => {
    if (!categories.length) return; // Ensure categories exist

    let newSelectedCategory = decodedGroup || categories[0]._id;
    setSelectedCategory(newSelectedCategory);

    const categoryMap = new Map(
      categories.map((groupCategory) => [groupCategory._id, groupCategory])
    );

    if (categoryMap.has(newSelectedCategory)) {
      setSelectedCategoryItem(categoryMap.get(newSelectedCategory)!.products);
    } else {
      setSelectedCategoryItem([]);
    }
  }, [decodedGroup, categories]);

  console.log(selectedCategory, selectedCategoryItem);

  return (
    <Suspense fallback={<p>Loading ..</p>}>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3  gap-4 mt-4">
        {/* left panel */}
        <div className="lg:col-span-1 sm:col-span-1  h-full md:px-8 p-4">
          <h2 className="text-lg font-semibold"> Category</h2>
          <hr className="my-3" />

          <CategoryItem category={categories} />
        </div>
        <div className="lg:col-span-3 sm:col-span-2  h-full md:p-8 p-4">
          <MainCategory
            item={selectedCategoryItem}
            categoryLabel={selectedCategory}
          />
        </div>
      </div>
    </Suspense>
  );
}
