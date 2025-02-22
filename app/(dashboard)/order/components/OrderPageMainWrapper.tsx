"use client";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { OrderType } from "@/models/OrderModel";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, use, useEffect, useRef, useState } from "react";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";
import Table from "../../commons/Table";
import { columns, TableData } from "@/app/data/columns";
import { orderMoreDetailType } from "@/app/columns/OrderMoreDetailColumns";
const ModalOverlay = React.lazy(() => import("../../commons/ModalOverLay"));

interface OrderPageMainWrapperProps {
  data: ClientOrderType[];
}
export default function OrderPageMainWrapper({
  data,
}: OrderPageMainWrapperProps) {
  console.log(data);
  // const [orderData, setOrderData] = useState<ClientOrderType[]>(data);
  const [search_Id, setSearchId] = useState<string | null>(null);
  const [moreDetailModal, setMoreDetailModal] = useState<boolean>(false);
  const [tableRowIndex, setTableRowIndex] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ClientOrderType | null>(
    null
  );

  const [formattedSelectedOrder, setFormattedSelectedOrder] =
    useState<orderMoreDetailType | null>(null);

  // useEffect(() => {
  //   setFormattedSelectedOrder({
  //     amount: selectedOrder?.payment.amount,
  //     currency: selectedOrder?.payment.currency,
  //     customer: selectedOrder?.customer.name,
  //     customer_country: selectedOrder?.customer.country,
  //     customer_email: selectedOrder?.customer.email,
  //     Description: selectedOrder?.product.description,
  //     productBreath: selectedOrder?.product.breath,
  //     productCategory: selectedOrder?.product.category,
  //     productDiscount: selectedOrder?.product.discount,
  //     productImgUrl: selectedOrder?.product.imgUrl,
  //     productItemWeight: selectedOrder?.product.itemWeight,
  //     productLength: selectedOrder?.product.length,
  //     productName: selectedOrder?.product.name,
  //     productPrice: selectedOrder?.product.price,
  //     productQuantity: selectedOrder?.product.quantity,
  //     productSKU: selectedOrder?.product.sku,
  //     productSize: selectedOrder?.product.size,
  //     productTag: selectedOrder?.product.tag,
  //     productUnit: selectedOrder?.product.unit,
  //     productWidth: selectedOrder?.product.width,
  //     qty: selectedOrder?.product.qty,
  //     tx_ref: selectedOrder?.tx_ref,
  //   });
  // }, [selectedOrder]);

  const searchParam = useSearchParams().get("status") ?? null;
  console.log(searchParam);
  const filteredData = data.filter((order) => {
    const matchesId =
      !search_Id ||
      String(order.user_id).toLowerCase().includes(search_Id.toLowerCase());

    return matchesId;
  });

  const handleSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  console.log(filteredData, search_Id);
  return (
    <section>
      <div className="flex sm:flex-row flex-col justify-between items-start gap-4 my-4">
        {/* <div className="bg-red-200 w-full"> */}
        <Input
          name="order_id"
          type="search"
          placeholder="Search by order id"
          onChange={handleSearchId}
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
        <table className="table-auto border-spacing-y-6">
          <thead className="bg-gray-200">
            <tr className="">
              <th className="text-left px-4 py-2">ORDER ID</th>
              <th className="text-left px-4 py-2">CREATED</th>
              <th className="text-left px-4 py-2">CUSTOMER</th>
              <th className="text-left px-4 py-2">TOTAL </th>
              {/* <th className="text-left px-4">PROFIT</th> */}
              {/* <th className="text-left px-4">STATUS</th> */}
              <th className="text-left px-4"></th>
            </tr>
          </thead>
          <tbody className="">
            {filteredData.map((item, i) => (
              <tr key={i} className="border-b-2">
                <td className="p-2 text-nowrap">{item._id}</td>
                <td className="p-2 text-nowrap">
                  {moment(item.createdAt).fromNow()}
                </td>
                <td className="p-2 text-nowrap">{item.customer.name}</td>
                <td className="p-2 text-nowrap">
                  {item.payment.currency ?? ""} {item.payment.amount}
                </td>
                {/* <td className="p-2 inline-flex gap-1 items-center">
                  $154
                  <span className="bg-[#7ce4ab] text-[#31985f] font-bold p-1">
                    16%
                  </span> 
               
                </td> */}

                <td>
                  <MdOutlineArrowDropDownCircle
                    className={`text-xl cursor-pointer ${
                      tableRowIndex === i && "rotate-180"
                    }`}
                    onClick={() => {
                      setSelectedOrder(item);
                      setTableRowIndex(i);
                      setMoreDetailModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalOverlay
        isCollapse={moreDetailModal}
        closeOverLay={() => {
          setMoreDetailModal(false);
          setTableRowIndex(null);
        }}
      >
        <Table columns={columns} data={TableData} />
      </ModalOverlay>
    </section>
  );
}
