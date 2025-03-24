"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { CategoryType } from "@/app/types/categoryType";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import ModalOverlay from "../../commons/ModalOverLay";
import Table from "../../commons/Table";
import {
  MoreCategoryColumn,
  moreCategoryType,
} from "@/app/columns/categoryColumn";

interface CategoryMainWrapperProps {
  data: CategoryType[];
}
export default function CategoryMainWrapper({
  data,
}: CategoryMainWrapperProps) {
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [isDropdown, setIsDropdown] = useState({ state: false, index: "" });
  const [moreDetailModal, setMoreDetailModal] = useState<boolean>(false);
  const [selectedCategoryArray, setSelectedCategoryArray] = useState<
    moreCategoryType[]
  >([]);
  const searchParam = useSearchParams().get("status") ?? null;
  console.log(selectedCategoryArray);
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

  console.log(filteredData);
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
      <div className="overflow-x-auto flex flex-col w-full">
        <table className="table-auto  border-spacing-y-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">SN</th>
              <th className="px-4 py-2 text-left min-w-52 max-w-72">
                Category
              </th>
              <th className="px-4 py-2 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length < 1 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 font-semibold w-full"
                >
                  No result
                </td>
              </tr>
            ) : (
              filteredData.map((item, i) => (
                <tr key={item._id}>
                  <td className="p-2">{i + 1}</td>
                  <td className="">{item._id}</td>
                  <td className="">
                    <button
                      type="button"
                      className="bg-green-400 p-1.5 text-white rounded-md whitespace-nowrap"
                      onClick={() => {
                        setMoreDetailModal(true);
                        setSelectedCategoryArray(item.products);
                      }}
                    >
                      View category item(s)
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalOverlay
        isCollapse={moreDetailModal}
        closeOverLay={() => {
          setMoreDetailModal(false);
          // setTableRowIndex(null);
        }}
      >
        <div className="overflow-x-auto overflow-y-auto">
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[300px]`}
                  style={{}}
                >
                  Id
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[300px]`}
                  style={{}}
                >
                  Product Name
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[350px]`}
                  style={{}}
                >
                  Description
                </th>

                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[150px]`}
                  style={{}}
                >
                  Product Tag
                </th>

                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[150px]`}
                  style={{}}
                >
                  Product Price
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[200px]`}
                  style={{}}
                >
                  Product Discount
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[150px]`}
                  style={{}}
                >
                  Product Qty
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[200px]`}
                  style={{}}
                >
                  Product SKU
                </th>

                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[150px]`}
                  style={{}}
                >
                  Product Size
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[250px]`}
                  style={{}}
                >
                  Product Weight
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[150px]`}
                  style={{}}
                >
                  Product Unit
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[200px]`}
                  style={{}}
                >
                  Product Breadth
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[200px]`}
                  style={{}}
                >
                  Product Length
                </th>
                <th
                  className={`border border-gray-300 px-4 py-2 min-w-[200px]`}
                  style={{}}
                >
                  Product Width
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedCategoryArray?.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.Description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productTag}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productDiscount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productQuantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productSKU}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productSize}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productItemWeight}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productUnit}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productBreath}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productLength}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.productWidth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalOverlay>
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
