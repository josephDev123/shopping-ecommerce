"use client";

import { ITransactionDTO } from "@/app/api/DTO/transactionDTO";
import DataTable from "@/components/ui/data-table";
import { ChangeEvent, useMemo, useState } from "react";
import { transactionColumns } from "../column.tsx/transaction-column";
import { ColumnFiltersState } from "@tanstack/react-table";

interface ITransactionTableProps {
  data: ITransactionDTO[];
}
export default function TransactionTable({ data }: ITransactionTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value.trim();
  //   if (value == "") {
  //     setColumnFilters([]);
  //     return;
  //   }
  //   setColumnFilters([
  //     { id: "_id", value: value },
  //     { id: "product_name", value: value },
  //     { id: "paymentDetails.amount", value: value },
  //     { id: "paymentDetails.status", value: value },
  //     { id: "order.customer.email", value: value },
  //     { id: "order.customer.name", value: value },
  //     { id: "order.order_status", value: value },
  //   ]);
  // };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowercased = searchTerm.toLowerCase();

    return data.filter((item) => {
      const searchable = [
        item._id,
        item.order?.items?.[0]?.productName,
        item.order?.customer?.email,
        item.order?.customer?.name,
        item.paymentDetails?.status,
        item.paymentDetails?.payment_type,
        item.order?.order_status,
        item.paymentDetails?.amount?.toString(),
        item.paymentDetails?.charged_amount?.toString(),
        item.paymentDetails?.merchant_fee?.toString(),
      ];

      return searchable.some((field) =>
        field?.toString().toLowerCase().includes(lowercased)
      );
    });
  }, [searchTerm, data]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between items-center my-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder="search columns"
          className="rounded-md p-2 border outline-none"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="md:w-[1100px] w-full">
          <DataTable
            columns={transactionColumns}
            data={filteredData}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    </div>
  );
}
