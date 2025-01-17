"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";
import { TransactionType } from "@/models/FlwTransactionModel";
import moment from "moment";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface ITransactionTableProps {
  // data: TransactionServerResponseType[];
  data: TransactionType[];
}
export default function TransactionTable({ data }: ITransactionTableProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const filteredData = data.filter((transaction) => {
    // const matchesName =
    //   !search ||
    //   String(transaction.orderDetails.customer.name)
    //     .toLowerCase()
    //     .includes(search.toLowerCase());
    const statusMatch =
      !status || transaction.data.status.toLowerCase() === status.toLowerCase();
    console.log(statusMatch);
    return statusMatch;
  });
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between  sm:items-center w-full">
        <div className="flex gap-2">
          <div className="flex flex-col relative w-full">
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="outline-none border rounded-md p-2 "
            />
            <CiSearch className="text-xl absolute right-2 top-3" />
          </div>

          <select
            name=""
            id=""
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md p-2 outline-none w-full"
          >
            <option value=""> Status</option>
            {["pending", "success", "failed"].map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <SelectInput
            name=""
            data={[]}
            placeholder="Filter by Range"
            labelName=""
            className="border rounded-md p-2 outline-none w-[200px]"
          />
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto w-full h-full my-10">
        <table>
          <thead className="bg-gray-200">
            <tr className="text-black/70">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">CUSTOMER</th>
              <th className="text-left p-2">DATE</th>
              <th className="text-left p-2">TOTAL</th>
              <th className="text-left p-2">METHOD</th>
              <th className="text-left p-2">STATUS</th>
              <th className="text-left p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((transaction, i) => (
              <tr className="border-b" key={i}>
                <td className="p-2">{transaction.data.id}</td>
                <td className="p-2 text-ellipsis w-40">
                  {transaction.data.customer.name}
                </td>
                <td className="p-2 text-nowrap">
                  {moment(transaction.data.created_at).format("DD MMM, yyyy")}
                </td>
                <td className="p-2 text-nowrap">
                  {transaction.data.currency}
                  {transaction.data.amount}
                </td>
                <td className="p-2">{transaction.data.payment_type}</td>
                <td className="text-yellow-400 font-semibold">
                  {transaction.data.status}
                </td>
                <td>
                  <Button
                    disabled
                    textContent="View Details"
                    className="text-blue-600 font-semibold text-nowrap cursor-not-allowed"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
