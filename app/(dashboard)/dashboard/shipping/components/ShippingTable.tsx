"use client";

import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Shipping, ShippingItem } from "../type/ApiShipping";
import { ShippingColumnDef } from "../columnDef.tsx/ShippingColumnDef";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface IShippingTableProps {
  data: Shipping[];
}

const fallback: any[] = [];
export default function ShippingTable({ data }: IShippingTableProps) {
  const [globalFilter, setGlobalFilter] = useState<any[]>([]);

  const { data: session, status } = useSession();
  console.log(data);
  const table = useReactTable({
    columns: ShippingColumnDef(
      status === "authenticated" && session.user.role === "admin"
    ),
    data: data ?? fallback,
    getSubRows: (row) =>
      "items" in row ? (row?.items as unknown as Shipping[]) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });
  return (
    <main className="flex flex-col w-full h-full ">
      <section className="flex flex-col  space-y-2">
        <input
          type="search"
          name=""
          placeholder="Search"
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="p-2 rounded-md border max-w-80 my-4"
        />

        <section className="overflow-x-auto max-w-full  bg-white rounded-lg p-4">
          <>
            {data?.length === 0 ? (
              <div className="flex flex-col h-52 justify-center items-center">
                No Shipping records found. Once data is available, it will
                appear here.
              </div>
            ) : (
              <table className="min-w-full border-collapse text-sm border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border border-gray-300 px-4 py-2 text-left text-nowrap"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <>
                      <tr
                        key={row.id}
                        className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="border-b border-gray-300 px-4 py-2"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Expanded sub-rows */}

                      {row.getIsExpanded() && (
                        <tr>
                          <td colSpan={row.getAllCells().length}>
                            <div className="bg-gray-50 p-4">
                              {row.original?.items?.map((item, index) => (
                                <div key={index} className="mb-2 border-b pb-2">
                                  <p>
                                    <b>Product:</b> {item.productName}
                                  </p>
                                  <p>
                                    <b>SKU:</b> {item.productSKU}
                                  </p>
                                  <p>
                                    <b>Category:</b> {item.productCategory}
                                  </p>
                                  <p>
                                    <b>Qty:</b> {item.qty}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>

                {/* <Pagination
                    decrementDisabled={decrementDisabled}
                    incrementDisabled={incrementDisabled}
                    limit={limit}
                    page={page}
                    totalPages={totalPages}
                    setSearchParams={setSearchParams}
                  /> */}
              </table>
            )}
          </>
        </section>
      </section>
    </main>
  );
}
