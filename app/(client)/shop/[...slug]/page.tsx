import React from "react";
import Button from "../../generic/Button";
import { productCardData } from "@/app/data/productCardData";
import ShopHeading from "./components/ShopHeading";
import ShopDetailSection from "./components/ShopDetailSection";
import ShopItemPreview from "./components/ShopItemPreview";
import { ProductResponseType } from "@/app/types/productsType";
import { CustomFetch } from "@/app/serverActions/customFetch";
import { IProductItemWithRelatedResponse } from "@/app/types/productWithRelatedItem";
import ProductCard from "../../generic/ProductCard";
import Image from "next/image";
import Link from "next/link";

type param = {
  slug: string[];
};

export default async function Page({ params }: { params: param }) {
  const productId = params.slug[0];
  const result: { data: IProductItemWithRelatedResponse } = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/product/get-product?product_id=${productId}`,
  });

  const product = result.data.product;
  const related = result.data.related.items;
  const discountedPrice = (productPrice: string, productDiscount: string) => {
    const discount =
      Number(productPrice.slice(1)) * (1 - Number(productDiscount) / 100);
    return discount;
  };

  return (
    <section className="flex flex-col w-full h-full">
      {/* <pre>{JSON.stringify(related, null, 2)}</pre> */}

      <ShopHeading data={product} />
      <ShopItemPreview data={product} />
      <ShopDetailSection data={product} />
      <hr />
      <hr className="py-6" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl mb-10">Related Products</h2>
        <div className="grid grid-cols-4 gap-4 w-[80%] mx-auto ">
          {related.length === 0 && (
            <div className="col-span-full h-52 flex flex-col justify-center items-center">
              <p className="text-xl">No related products yet</p>
            </div>
          )}
          {related.map((relateItem, idx) => (
            <section
              key={idx}
              className="flex flex-col bg-[#F4F5F7] relative cursor-pointer group rounded-lg"
            >
              <div className="flex-col justify-center items-center absolute top-0 w-full h-[80%] bg-gray-50/50 sm:group-hover:flex hidden"></div>
              <span className="bg-[#E97171] rounded-full flex flex-col h-fit justify-center items-center absolute right-6 top-8 p-1 text-white ">
                {relateItem.productDiscount}%
              </span>
              <Image
                src={relateItem.productImgUrl[0].url}
                alt={relateItem.productName}
                height={300}
                width={300}
                className="w-full object-cover rounded-t-lg"
                style={{ maxHeight: 300 }}
              />
              <div className="mt-auto p-2">
                <div className="flex justify-between items-center gap-3">
                  <Link
                    title={relateItem.productName}
                    href={`/shop/${relateItem._id}`}
                    className="font-bold hover:underline w-52 truncate"
                  >
                    {relateItem.productName}
                  </Link>
                </div>

                <p className="truncate">{relateItem.Description}</p>
                <span className="flex justify-between items-center">
                  <p className="font-bold">{relateItem.productPrice}</p>
                  <p className="">
                    {discountedPrice(
                      relateItem.productPrice,
                      relateItem.productDiscount
                    ).toFixed(2)}
                  </p>
                </span>
              </div>
            </section>
          ))}
        </div>
        <Button
          textContent="Show More"
          className="my-5 border border-[#B88E2F] text-[#B88E2F] font-medium w-[245px] h-12"
        />
      </div>
    </section>
  );
}
