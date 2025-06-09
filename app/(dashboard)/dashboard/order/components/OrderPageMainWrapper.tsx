"use client";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";
import { MainTableColumn } from "../column/MainTableColumn";
import { IMainTableColumn } from "../column/IMainTableColumn";
import { filterSelectColumn } from "../column/filterSelectColumnData";
const ModalOverlay = React.lazy(() => import("../../../commons/ModalOverLay"));

interface OrderPageMainWrapperProps {
  data: ClientOrderType[];
  totalRows: number;
}
export default function OrderPageMainWrapper({
  data,
  totalRows,
}: OrderPageMainWrapperProps) {
  // console.log(data);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [column, setColumn] = useState("");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  console.log("column", columnFilters);

  const tableData: IMainTableColumn[] = data.map((order) => ({
    _id: order._id,
    user_id: order.user_id,
    tx_ref: order.tx_ref,
    products: order.items.map((item) => ({
      qty: item?.qty || "N/A",
      productName: item?.productName || "N/A",
      Description: item?.Description || "N/A",
      productCategory: item?.productCategory || "N/A",
      productTag: item?.productTag || "N/A",
      productPrice: item?.productPrice || "N/A",
      productDiscount: item?.productDiscount || "N/A",
      productSKU: item?.productSKU || "N/A",
      productSize: item?.productSize || "N/A",
      productImgUrl: item?.productImgUrl.map((imgObj) => imgObj) || [],
    })),
    payment: {
      paymentMethod: order.payment.paymentMethod,
      amount: order.payment.amount,
      currency: order.payment.currency,
    },
    billing: {
      amount: order.billing.amount,
      currency: order.billing.currency,
    },
    customer: {
      email: order.customer.email,
      name: order.customer.name,
      phonenumber: order.customer.phonenumber,
      country: order.customer.country,
      address: order.customer.address,
      town: order.customer.town,
      additionalInfo: order.customer.additionalInfo || "",
    },
    createdAt: moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(order.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    order_status: order.order_status,
  }));

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value == "") {
      setColumnFilters([]);
      return;
    }
    if (column === "") {
      setColumnFilters([{ id: "productName", value: value }]);
      return;
    }
    setColumnFilters([{ id: column, value: value }]);
  };
  const handleSetColumnTofilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value;
    setColumn(column);
  };
  useEffect(() => {
    if (status) {
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== "OrderStatus"),
        {
          id: "OrderStatus",
          value: status,
        },
      ]);
    }
  }, [status]);

  return (
    <section className="">
      {/* {JSON.stringify(searchParam, null, 2)} */}

      <div className="flex justify-between items-center gap-4 my-2">
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
          className="border rounded-md p-2 w-fit"
        >
          <option value="">Filter by</option>
          {filterSelectColumn.map((column, i) => (
            <option value={column.column} key={i}>
              {column.value}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto flex flex-col w-full h-full">
        <DataTable
          data={tableData}
          columns={MainTableColumn}
          columnFilters={columnFilters}
          rowCount={totalRows}
          manualPagination={true}
        />
      </div>

      {/* modal */}
      {/* <ModalOverlay
        isCollapse={moreDetailModal}
        closeOverLay={() => {
          setMoreDetailModal(false);
          setTableRowIndex(null);
        }}
      >
        <Table
          columns={OrderMoreDetailColumns}
          data={[formattedSelectedOrder]}
        />
      </ModalOverlay> */}
    </section>
  );
}
