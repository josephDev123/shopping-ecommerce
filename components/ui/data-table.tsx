"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect, SetStateAction, Dispatch, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IProduct } from "@/app/(dashboard)/dashboard/indexComponent/ILatestOrder";
interface DataTableProps<TData, TValue, TSubData> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onTableReady?: (table: any) => void;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  rowCount: number; // 👈 Add rowCount prop for pagination
  manualPagination?: boolean; // 👈 Add manualPagination prop
  hiddenPaginationBtn?: boolean; // 👈 Add hiddenPagination prop
}

const DataTable = function <TData, TValue, TSubData = unknown>({
  columns,
  data,
  columnFilters,
  setColumnFilters,
  onTableReady,
  rowCount,
  manualPagination,
  hiddenPaginationBtn = false,
}: DataTableProps<TData, TValue, TSubData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 1, //initial page index
    pageSize: 10, //default page size
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnFilters,
      expanded,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: () => setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded, // <- 👈 Handle row expansion
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => true,
    getSubRows: (row) => (row as any).items, // 👈 Use the original data for sub-rows
    rowCount: rowCount, // 👈 Use rowCount prop for pagination
    // pageCount: rowCount,
    onPaginationChange: setPagination,
    manualPagination: manualPagination, // 👈 Use manualPagination prop
  });

  useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);
  // console.log("Pagination", pagination);
  // console.log("Row Model", table.getRowModel().rows.length);

  return (
    <div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-gray-300">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-eduvoColor">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getAllCells().length}>
                        Expand UI Rows coming soon ...
                        {/* {row.getex.items?.map((item: IProduct) => ()} */}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!hiddenPaginationBtn && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.previousPage()}
            onClick={() => {
              const newPageIndex = pagination.pageIndex - 1;
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (newPageIndex + 1).toString()); // +1 because server expects 1-based
              params.set("limit", pagination.pageSize.toString());
              router.push(`?${params.toString()}`);
            }}
            // disabled={!table.getCanPreviousPage()}
            disabled={Number(searchParams.get("page")) <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.nextPage()}
            onClick={() => {
              const newPageIndex = pagination.pageIndex;
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (newPageIndex + 1).toString());
              params.set("limit", pagination.pageSize.toString());
              router.push(`?${params.toString()}`);
            }}
            // disabled={!table.getCanNextPage()}
            disabled={
              Number(searchParams.get("page")) >=
              Math.ceil(rowCount / pagination.pageSize)
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
