import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";
import UpdateShippingBtn from "../components/UpdateShippingBtn";

export const ShippingColumnDef = (isAdmin: boolean): ColumnDef<Shipping>[] => {
  return [
    {
      header: "S/N",
      cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
    },

    {
      header: "Tracking Number",
      accessorKey: "trackingNumber",
      cell: ({ row }) => (
        <div className="min-w-72 ">{row.original.trackingNumber}</div>
      ),
    },
    {
      header: "Shipping Method",
      accessorKey: "shippingMethod",
    },

    { header: "Status", accessorKey: "status" },
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
            className="w-28"
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
      cell: ({ row }) => (
        <div className="min-w-72 ">{row?.original?.customer?.address}</div>
      ),
    },

    {
      header: "Created At",
      // accessorKey: "createdAt",
      cell: ({ row }) =>
        new Date(row?.original?.updatedAt).toLocaleDateString("en"),
    },

    {
      header: "Updated At",
      // accessorKey: "updatedAt",
      cell: ({ row }) =>
        new Date(row?.original?.createdAt).toLocaleDateString("en"),
    },

    ...(isAdmin
      ? [
          {
            header: "Action",
            cell: ({ row }: CellContext<Shipping, unknown>) => (
              <UpdateShippingBtn row={row} />
            ),
          },
        ]
      : []),
  ];
};
