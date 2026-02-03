"use client";

import Input from "@/app/(client)/generic/Input";
import { Images } from "@/app/Images";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import React, { ChangeEvent, useState } from "react";
import DataTable from "@/components/ui/data-table";
import { ColumnFiltersState } from "@tanstack/react-table";
import { CustomerColumn } from "../column/customerColumn";
import { ICustomerColumn } from "../column/IcustomerColumn";
import { filterBasedOnColumn } from "../column/filterBaseColumn";

interface CustomerTableProps {
  data: ClientOrderType[];
  totalRow: number;
}

export default function CustomerTable({ data, totalRow }: CustomerTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [column, setColumn] = useState("");
  console.log(data);
  const handleSetColumnTofilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value;
    setColumn(column);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value == "") {
      setColumnFilters([]);
      return;
    }
    if (column === "") {
      setColumnFilters([{ id: "name", value: value }]);
      return;
    }
    setColumnFilters([{ id: column, value: value }]);
  };

  const tableData = data.map(
    (data, i): ICustomerColumn => ({
      name: data.customer.name ?? "",
      email: data.customer.email ?? "",
      phonenumber: data.customer.phonenumber ?? "",
      // companyName: data.customer.companyName ?? "",
      address: data.customer.address ?? "",
      town: data.customer.town ?? "",
      province: data.customer.province ?? "",
      country: data.customer.country ?? "",
      zipCode: data.customer.zipCode ?? "",
      additionalInfo: data.customer.additionalInfo ?? "",
    }),
  );
  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full gap-3 ">
        <input
          type="search"
          name=""
          placeholder={`search ${column}`}
          onChange={handleSearch}
          id=""
          className="border rounded-md p-1.5 sm:w-52 w-full"
        />

        <select
          onChange={handleSetColumnTofilter}
          className="border rounded-md p-2  sm:w-52 w-full"
        >
          <option value="">Filter by</option>
          {filterBasedOnColumn.map((column, i) => (
            <option value={column.column} key={i}>
              {column.value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col overflow-x-auto w-full my-5">
        <DataTable
          data={tableData}
          columns={CustomerColumn}
          columnFilters={columnFilters}
          rowCount={totalRow}
          manualPagination={true}
        />
      </div>
    </section>
  );
}
