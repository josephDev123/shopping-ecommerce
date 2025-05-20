import { ColumnDef } from "@tanstack/react-table";
import { ILatestOrderDTO } from "../ILatestOrder";

export const latestOrdersColumn: ColumnDef<ILatestOrderDTO>[] = [
  {
    id: "expander",
    header: "Product items",
    cell: ({ row }) => {
      const firstProductName = row.original.items?.[0]?.productName ?? "";

      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="w-36 truncate"
        >
          {firstProductName} {row.getIsExpanded() ? "👇" : "👉"}
        </button>
      ) : (
        <span>{firstProductName}</span>
      );
    },
  },
  {
    header: "Payment amount",
    accessorKey: "payment.amount",
    cell: (props) => (
      <span className="w-28 truncate">
        {String(props.getValue()).toUpperCase()}
      </span>
    ),
  },
  {
    header: "Billing amount",
    accessorKey: "billing.amount",
  },
  {
    header: "Customer Name",
    accessorKey: "customer.name",
    cell: (props) => (
      <span className="w-36 truncate">{String(props.getValue())}</span>
    ),
  },

  {
    header: "Customer Email",
    accessorKey: "customer.email",
  },
];
