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
  console.log(data);
  const filteredData = data.filter((category) => {
    const matchesCategorySearch =
      !searchCategory ||
      String(category._id).toLowerCase().includes(searchCategory.toLowerCase());

    return matchesCategorySearch;
  });

  const [products, _id] = filteredData.map((item) => item) || [];
  // console.log(products.products);

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(e.target.value);
  };

  // console.log(filteredData, searchCategory);
  return (
    <section className="flex flex-col w-full">
      <div className="flex sm:flex-row flex-col justify-between  items-start gap-4 my-4">
        {/* <div className="bg-red-200 w-full"> */}
        <Input
          name="categorySearch"
          type="search"
          placeholder="Search by category"
          onChange={handleCategorySearch}
          labelName=""
          className="bg-white border p-3  outline-none rounded-md shadow-md sm:max-w-[320px] w-full"
        />
        {/* </div> */}

        <div className=" sm:max-w-[320px] w-full">
          <SelectInput
            name="date-range"
            data={[]}
            placeholder="Filter by date range"
            labelName=""
            className="bg-white border p-3 outline-none rounded-md shadow-md  "
          />
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col w-full h-full">
        <table className="table-auto border-separate border-spacing-y-2 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-52 text-left">SN</th>
              <th className="w-52 text-left">Category</th>
              <th className="w-52 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, i) => (
              <tr key={item._id}>
                <td className="w-52">{i + 1}</td>
                <td className="w-52">{item._id}</td>
                <td className="w-52">
                  <button
                    type="button"
                    className="bg-green-400 p-1.5 text-white rounded-md"
                    onClick={
                      () => alert("View category item(s) clicked coming ...")
                      // setIsDropdown((prev) => ({
                      //   ...prev,
                      //   state: !prev.state,
                      //   index: item._id,
                      // }))
                    }
                  >
                    View category item(s)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// <div className="flex items-center">
//                 {isDropdown.state && isDropdown.index === item._id && (
//                   <div className="overflow-x-auto flex w-full flex-col ">

//                     <>
//                       {item.products.map((product, i) => (
//                         <div
//                           key={i}
//                           className={`w-full border h-60 overflow-y-auto  space-y-4 p-2 ${
//                             i + 1 / 2 === 0 ? "bg-yellow-100" : "bg-gray-200"
//                           }`}
//                         >
//                           <span className="flex flex-col text-nowrap">
//                             <h1 className="font-bold">No:</h1>
//                             {i + 1}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product Id:</h1>
//                             {product.id}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product name:</h1>
//                             {product.productName}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product description:</h1>
//                             {product.Description}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product ag:</h1>
//                             {product.productTag}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product price:</h1>
//                             {product.productPrice}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product discount:</h1>
//                             {product.productDiscount}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product qty:</h1>
//                             {product.productQuantity}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product SKU:</h1>
//                             {product.productSKU}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product size:</h1>
//                             {product.productSize}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product weight:</h1>
//                             {product.productItemWeight}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product unit:</h1>
//                             {product.productUnit}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product breath:</h1>
//                             {product.productBreath}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product length:</h1>
//                             {product.productLength}
//                           </span>
//                           <span className=" flex flex-col text-nowrap">
//                             <h1 className="font-bold">Product width:</h1>
//                             {product.productWidth}
//                           </span>
//                           {/* <span className="p-2 text-nowrap flex-1">
//                           {product.id}
//                         </span> */}
//                         </div>
//                       ))}
//                     </>
//                   </div>
//                 )}
//               </div>
