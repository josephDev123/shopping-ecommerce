import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";
import UpdateShippingBtn from "../components/UpdateShippingBtn";
import { statusStyles } from "../data/statusStyle";

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

    {
      header: "Shipping Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const style = statusStyles[status] ?? {
          bg: "bg-gray-100",
          text: "text-gray-600",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex justify-center items-center ${style.bg} ${style.text}`}
          >
            {status}
          </span>
        );
      },
    },

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
