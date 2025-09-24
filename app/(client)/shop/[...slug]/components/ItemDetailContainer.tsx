"use client";

import { FullProduct } from "@/app/types/productWithRelatedItem";
import ShopDetailSection, { ICountData } from "./ShopDetailSection";
import ShopItemPreview from "./ShopItemPreview";
import { useState } from "react";
import { ReviewDistribution } from "../type/IReviews";

interface ItemDetailContainerProps {
  product: FullProduct;
}

export default function ItemDetailContainer({
  product,
}: ItemDetailContainerProps) {
  const [ReviewCountData, setReviewCountData] = useState<ICountData>({
    totalReview: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const handleCountData = (info: ICountData) => {
    console.log(info);
    setReviewCountData(info);
  };

  return (
    <>
      <ShopItemPreview data={product} ReviewCountInfo={ReviewCountData} />
      <ShopDetailSection data={product} CountData={handleCountData} />
    </>
  );
}
