"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { CategoryType } from "@/app/types/categoryType";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

interface CategoryMainWrapperProps {
  data: CategoryType[];
}
export default function CategoryMainWrapper({
  data,
}: CategoryMainWrapperProps) {
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [isDropdown, setIsDropdown] = useState({ state: false, index: "" });
  const searchParam = useSearchParams().get("status") ?? null;

  const filteredData = data.filter((category) => {
    // const matchesStatus =
    //   !searchParam || order.payment.status.toLowerCase() === searchParam;
    const matchesCategorySearch =
      !searchCategory ||
      String(category._id).toLowerCase().includes(searchCategory.toLowerCase());

    return matchesCategorySearch;
  });

  const [products, _id] = filteredData.map((item) => item);
  console.log(products.products);

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const TimeId = setTimeout(() => {
    setSearchCategory(e.target.value);
    // }, 1000);

    // clearTimeout(TimeId);
  };

  // console.log(filteredData, searchCategory);
  return (
    <section>
      <div className="flex sm:flex-row flex-col justify-between items-start gap-4 my-4">
        {/* <div className="bg-red-200 w-full"> */}
        <Input
          name="categorySearch"
          type="search"
          placeholder="Search by category"
          onChange={handleCategorySearch}
          labelName=""
          className="bg-white border p-3  outline-none rounded-md drop-shadow-md sm:max-w-[320px] w-full"
        />
        {/* </div> */}

        <div className=" sm:max-w-[320px] w-full">
          <SelectInput
            name="date-range"
            data={[]}
            placeholder="Filter by date range"
            labelName=""
            className="bg-white border p-3 outline-none rounded-md drop-shadow-md  "
          />
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col w-full h-full">
        <div className="flex items-center w-full">
          <span className="text-left px-4 flex-1"> ID</span>
          <span className="text-left px-4 flex-1"> Category</span>
          <span className="text-left px-4 flex-1">CREATED</span>
          <span className="text-left px-4 flex-1">UPDATED</span>

          <span className="text-left px-4"></span>
        </div>
        <div className="">
          {filteredData.map((item, i) => (
            <>
              <div className="flex items-center w-full">
                <span className="p-2 text-nowrap flex-1">1</span>
                <span className="p-2 text-nowrap flex-1">{item._id}</span>
                <span className="p-2 text-nowrap flex-1">
                  {/* {moment(item.createdAt).fromNow()} */}
                  NOV 2,2024
                </span>
                <span className="p-2 text-nowrap flex-1">
                  {/* {moment(item.createdAt).fromNow()} */}
                  NOV 2,2024
                </span>
                <span>
                  <MdOutlineArrowDropDownCircle
                    className="text-xl cursor-pointer"
                    onClick={() =>
                      setIsDropdown((prev) => ({
                        ...prev,
                        state: !prev.state,
                        index: item._id,
                      }))
                    }
                  />
                </span>
              </div>
            </>
          ))}

          <div className="overflow-x-auto flex flex-col w-full">
            <div
              className={`flex items-center w-full 
                ${isDropdown.state ? "block" : "hidden"}   
                  `}
            >
              <span className="text-left px-4 flex-1 text-nowrap"> ID</span>
              <span className="text-left px-4 flex-1 text-nowrap">
                {" "}
                PRODUCT NAME
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT DESCRIPTION
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT TAG
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT PRICE
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT DISCOUNT
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT QUANTITY
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT SKU
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT SIZE
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT WEIGHT
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT UNIT
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT BREATH
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT LENGTH
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT WIDTH
              </span>
              <span className="text-left px-4 flex-1 text-nowrap">
                PRODUCT IMAGE
              </span>
              <span className="text-left px-4"></span>
            </div>
            {isDropdown.state && (
              <>
                {products.products.map((product, i) => (
                  <div key={i} className="w-full border">
                    <span className="p-2 flex-1 text-nowrap">{product.id}</span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productName}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.Description}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productTag}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productPrice}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productDiscount}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productQuantity}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productSKU}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productSize}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productItemWeight}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productUnit}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productBreath}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productLength}
                    </span>
                    <span className="p-2 flex-1 text-nowrap">
                      {product.productWidth}
                    </span>
                    <span className="p-2 text-nowrap flex-1">{product.id}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* <FooterPagination
        itemToShow=""
        totalDocs={0}
        searchParam=""
        setLimit={() => ""}
      /> */}
    </section>
  );
}
