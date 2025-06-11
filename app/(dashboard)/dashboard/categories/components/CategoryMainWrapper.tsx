"use client";

import Input from "@/app/(client)/generic/Input";
import { CategoryType } from "@/app/types/categoryType";
import React, { useState } from "react";
import DataTable from "@/components/ui/data-table";
import { ColumnFiltersState } from "@tanstack/react-table";
import { CategoryColumn } from "../column/CategoryColumn";

interface CategoryMainWrapperProps {
  data: CategoryType[];
  totalRows: number;
}
export default function CategoryMainWrapper({
  data,
  totalRows,
}: CategoryMainWrapperProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // console.log(data);

  const handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value == "") {
      setColumnFilters([]);
      return;
    }

    setColumnFilters([{ id: "category", value: value }]);
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex sm:flex-row flex-col justify-between  items-start gap-4 mb-2">
        <Input
          name="categorySearch"
          type="search"
          placeholder="Search by category"
          onChange={handleCategorySearch}
          labelName=""
          className="bg-white border p-3  outline-none rounded-md shadow-md sm:w-[320px] w-full"
        />
      </div>
      <div className="overflow-x-auto flex flex-col w-full">
        <DataTable
          data={data}
          columns={CategoryColumn}
          columnFilters={columnFilters}
          rowCount={totalRows}
          manualPagination={true}
        />
      </div>

      {/* <ModalOverlay
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
      </ModalOverlay> */}
    </section>
  );
}
