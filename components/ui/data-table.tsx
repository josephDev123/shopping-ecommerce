"use client";

import {
  ColumnDef,
  ColumnFilter,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect, SetStateAction, Dispatch, Fragment } from "react";
import { IProduct } from "@/app/(dashboard)/dashboard/indexComponent/ILatestOrder";
interface DataTableProps<TData, TValue, TSubData> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onTableReady?: (table: any) => void;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  // getSubRows?: (row: TData) => TSubData[];
  // renderSubRow?: (row: TData) => React.ReactNode; // 👈 Dynamic rendering
}

const DataTable = function <TData, TValue, TSubData = unknown>({
  columns,
  data,
  columnFilters,
  setColumnFilters,
  onTableReady,
}: // getSubRows,
// renderSubRow,
DataTableProps<TData, TValue, TSubData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [expanded, setExpanded] = useState({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnFilters,
      expanded,
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
  });

  useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  return (
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
