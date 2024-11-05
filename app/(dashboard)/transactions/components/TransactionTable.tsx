"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";
import moment from "moment";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface ITransactionTableProps {
  data: TransactionServerResponseType[];
}
export default function TransactionTable({ data }: ITransactionTableProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const filteredData = data.filter((transaction) => {
    const matchesName =
      !search ||
      String(transaction.orderDetails.customer.name)
        .toLowerCase()
        .includes(search.toLowerCase());
    const statusMatch =
      !status ||
      transaction.orderDetails.payment.status.toLowerCase() ===
        status.toLowerCase();
    console.log(statusMatch, matchesName);
    return statusMatch && matchesName;
  });
  return (
    <>
      <div className="flex justify-between  items-center w-full flex-wrap">
        <div className="flex gap-2">
          <Input
            name=""
            labelName=""
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            icon={<CiSearch className="text-xl" />}
            type="text"
            className=" outline-none"
            wrapperClassName="border rounded-md p-2 w-fit"
          />

          <SelectInput
            name=""
            data={["pending", "success", "failed"]}
            placeholder="Status"
            onChange={(e) => setStatus(e.target.value)}
            labelName=""
            className="border rounded-md p-2 outline-none"
          />
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
                <td className="p-2">{transaction._id}</td>
                <td className="p-2 text-ellipsis w-40">
                  {transaction.orderDetails.customer.name}
                </td>
                <td className="p-2 text-nowrap">
                  {moment(transaction.createdAt).format("DD MMM, yyyy")}
                </td>
                <td className="p-2 text-nowrap">
                  {transaction.orderDetails.payment.currency}
                  {transaction.orderDetails.payment.amount}
                </td>
                <td className="p-2">??</td>
                <td className="text-yellow-400 font-semibold">
                  {transaction.orderDetails.payment.status}
                </td>
                <td>
                  <Button
                    textContent="View Details"
                    className="text-blue-600 font-semibold text-nowrap"
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
