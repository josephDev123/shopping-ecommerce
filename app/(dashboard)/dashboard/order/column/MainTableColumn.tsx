import { ColumnDef } from "@tanstack/react-table";
import { IMainTableColumn } from "./IMainTableColumn";

export const MainTableColumn: ColumnDef<IMainTableColumn>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div title={row.getValue("_id")} className="w-36 truncate">
        {row.getValue("_id")}
      </div>
    ),
  },
  {
    accessorKey: "tx_ref",
    header: "Transaction Reference",
    cell: ({ row }) => (
      <div title={row.getValue("tx_ref")} className="w-36 truncate">
        {row.getValue("tx_ref")}
      </div>
    ),
  },
  {
    // accessorKey: "products?.[0]?.productName",
    accessorFn: (row) => row.products?.[0]?.productName,
    id: "productName",
    header: "products Name",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
          title={row.original.products?.[0]?.productName || ""}
          className="w-32 truncate bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition-colors"
        >
          {row.getIsExpanded()
            ? `${row.original.products?.[0]?.productName?.slice(0, 10) ?? ""}👇`
            : `${row.original.products?.[0]?.productName ?? ""}👉`}
        </button>
      ) : (
        ""
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      const productName =
        row.original.products?.[0]?.productName?.toLowerCase() || "";
      return productName.includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "payment.amount",
    header: "Amount",
  },

  {
    accessorKey: "billing.amount",
    header: "Billing Amount",
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.original.billing.amount}</div>
    ),
  },
  {
    accessorKey: "customer.name",
    id: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.original.customer.name}</div>
    ),
  },
  {
    accessorKey: "customer.email",
    id: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.original.createdAt}</div>
    ),
  },
  {
    accessorKey: "order_status",
    id: "OrderStatus",
    header: "Order Status",
    cell: ({ row }) => (
      <div className="w-28 truncate">{row.original.order_status}</div>
    ),
  },
];
