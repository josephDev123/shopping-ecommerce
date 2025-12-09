import { ColumnDef } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";

export const ShippingColumnDef: ColumnDef<Shipping>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },

  {
    header: "Tracking Number",
    accessorKey: "trackingNumber",
  },
  {
    header: "Shipping Method",
    accessorKey: "shippingMethod",
  },

  { header: "Status", accessorKey: "shippingMethod" },
  {
    header: "Amount Paid",
    accessorKey: "transaction.paymentDetails.charged_amount",
  },
  {
    header: "Payment Status",
    accessorKey: "transaction.paymentDetails.status",
  },

  {
    header: "items",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
        >
          {row.getIsExpanded() ? `item 👇` : "item 👉"}
        </button>
      ) : (
        ""
      );
    },
  },

  {
    header: "Customer Email",
    accessorKey: "customer.email",
  },

  {
    header: "Customer Name",
    accessorKey: "customer.name",
  },

  {
    header: "Customer Number",
    accessorKey: "customer.phonenumber",
  },

  {
    header: "Customer Country",
    accessorKey: "customer.country",
  },

  {
    header: "Customer Address",
    accessorKey: "customer.address",
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
  },

  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
];
