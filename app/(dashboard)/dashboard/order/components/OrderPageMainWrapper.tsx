"use client";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { OrderType } from "@/models/OrderModel";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, use, useEffect, useRef, useState } from "react";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";
import Table from "../../../commons/Table";
import { columns, TableData } from "@/app/data/columns";
import {
  OrderMoreDetailColumns,
  orderMoreDetailType,
} from "@/app/columns/OrderMoreDetailColumns";
import { ColumnFiltersState } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";
import { MainTableColumn } from "../column/MainTableColumn";
import { IMainTableColumn } from "../column/IMainTableColumn";
const ModalOverlay = React.lazy(() => import("../../../commons/ModalOverLay"));

interface OrderPageMainWrapperProps {
  data: ClientOrderType[];
}
export default function OrderPageMainWrapper({
  data,
}: OrderPageMainWrapperProps) {
  // console.log(data);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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

  const handleSearchByProductName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    console.log(value);

    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== "productName"),
      { id: "productName", value: value },
    ]);
  };

  useEffect(() => {
    if (status) {
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== "order_status"),
        {
          id: "order_status",
          value: status,
        },
      ]);
    }
  }, [status]);
  return (
    <section className="">
      {/* {JSON.stringify(searchParam, null, 2)} */}

      <div className="flex sm:flex-row flex-col justify-between items-start gap-4 my-2">
        <Input
          name="order_id"
          type="search"
          placeholder="Search by product name"
          onChange={handleSearchByProductName}
          labelName=""
          className="bg-white border p-2  outline-none rounded-md shadow-md sm:max-w-[320px] w-full"
        />
        {/* </div> */}

        <div className=" sm:max-w-[320px] w-full">
          <SelectInput
            name="date-range"
            data={[]}
            placeholder="Filter by date range"
            labelName=""
            className="bg-white border p-2 outline-none rounded-md shadow-md  "
          />
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col w-full">
        <DataTable
          data={tableData}
          columns={MainTableColumn}
          columnFilters={columnFilters}
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
