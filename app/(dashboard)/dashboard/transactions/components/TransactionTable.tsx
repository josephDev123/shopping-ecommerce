"use client";

import { ITransactionDTO } from "@/app/api/DTO/transactionDTO";
import DataTable from "@/components/ui/data-table";
import { ChangeEvent, useMemo, useState } from "react";
import { transactionColumns } from "../column.tsx/transaction-column";
import { ColumnFiltersState } from "@tanstack/react-table";
import { filterColumn } from "../data/filterColumn";

interface ITransactionTableProps {
  data: ITransactionDTO[];
}
export default function TransactionTable({ data }: ITransactionTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [column, setColumn] = useState("");

  const filterableKeys = transactionColumns.filter(
    (col) => col.enableColumnFilter
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value == "") {
      setColumnFilters([]);
      return;
    }
    setColumnFilters([{ id: column, value: value }]);
  };

  const handleSetColumnTofilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value;
    setColumn(column);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between items-center my-2">
        {/* {JSON.stringify(filterableKeys)} */}
        <input
          onChange={handleSearch}
          type="search"
          placeholder={`search ${column}`}
          className="rounded-md p-2 border outline-none"
        />
        <select
          onChange={handleSetColumnTofilter}
          className="border rounded-md p-2 w-fit"
        >
          <option value="">Filter by</option>
          {filterColumn.map((column, i) => (
            <option value={column.column} key={i}>
              {column.value}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full overflow-x-auto">
        {/* min-[1900px]:w-full 2xl:w-[1300px] md:w-[1100px] */}
        <div className=" ">
          <DataTable
            columns={transactionColumns}
            data={data}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    </div>
  );
}
