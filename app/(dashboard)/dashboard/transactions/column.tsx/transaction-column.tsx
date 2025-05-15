import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ITransactionDTO } from "@/app/api/DTO/transactionDTO";
import Image from "next/image";

export const transactionColumns: ColumnDef<ITransactionDTO>[] = [
  {
    accessorKey: "_id",
    enableColumnFilter: true,
    header: "Transaction ID",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="inline-flex flex-wrap">{row.original._id}</div>
    ),
  },
  {
    accessorKey: "productImgUrl",
    header: "Product pic",
    cell: ({ row }) => (
      <div>
        <Image
          src={row.original.order.items[0].productImgUrl[0].url}
          alt=""
          loading="lazy"
          width={150}
          height={150}
          className="rounded-md "
        />
      </div>
    ),
  },

  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
        // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product name
      </button>
    ),
    enableColumnFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const value = row.original.order.items[0].productName;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="">{row.original.order.items[0].productName}</div>
    ),
  },
  {
    accessorKey: "product_qty",

    header: ({ column }) => (
      <button className="text-nowrap w-full inline-flex items-center">
        Product QTY
      </button>
    ),
    cell: ({ row }) => (
      <div className="">{row.original.order.items[0].qty}</div>
    ),
  },
  {
    accessorKey: "paymentDetails.amount",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4 " />
      </button>
    ),

    cell: ({ row }) => {
      const amount = row.original.paymentDetails.amount;
      const currency = row.original.paymentDetails.currency;
      return `${currency} ${amount.toFixed(2)}`;
    },
  },

  {
    accessorKey: "paymentDetails.charged_amount",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
      >
        Charged Amount
      </button>
    ),
    cell: ({ row }) => {
      const charged_amount = row.original.paymentDetails.charged_amount;

      const currency = row.original.paymentDetails.currency;
      return `${currency} ${charged_amount.toFixed(2)}`;
    },
  },

  {
    accessorKey: "paymentDetails.merchant_fee",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
      >
        Merchant Fee
      </button>
    ),
    cell: ({ row }) => {
      const merchant_fee = row.original.paymentDetails.merchant_fee;

      const currency = row.original.paymentDetails.currency;
      return `${currency} ${merchant_fee.toFixed(2)}`;
    },
  },

  {
    accessorKey: "paymentDetails.app_fee",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
      >
        App Fee
      </button>
    ),
    cell: ({ row }) => {
      const merchant_fee = row.original.paymentDetails.app_fee;

      const currency = row.original.paymentDetails.currency;
      return `${currency} ${merchant_fee.toFixed(2)}`;
    },
  },

  {
    accessorKey: "paymentDetails.payment_type",
    header: ({ column }) => (
      <button
        // variant="ghost"
        className="text-nowrap w-full inline-flex items-center"
      >
        Payment Type
      </button>
    ),
    cell: ({ row }) => {
      const payment_type = row.original.paymentDetails.payment_type;
      return `${payment_type}`;
    },
  },
  {
    accessorKey: "paymentDetails.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.paymentDetails.status;
      return (
        <Badge
          variant={status === "successful" ? "default" : "destructive"}
          className="text-nowrap w-full inline-flex items-center"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order.customer.email",
    header: "Customer Email",
    cell: ({ row }) => {
      const customerEmail = row.original.order.customer.email;
      return (
        // <Badge variant={status === "successful" ? "default" : "destructive"}>
        <button
          className="text-nowrap w-full inline-flex items-center"
          type="button"
        >
          {customerEmail}
        </button>

        // </Badge>
      );
    },
  },
  {
    accessorKey: "order.customer.name",
    header: "Customer Name",
    cell: ({ row }) => {
      const customerName = row.original.order.customer.name;
      return (
        // <Badge variant={status === "successful" ? "default" : "destructive"}>
        <button
          className="text-nowrap w-full inline-flex items-center"
          type="button"
        >
          {customerName}
        </button>

        // </Badge>
      );
    },
  },

  {
    accessorKey: "order.order_status",
    header: "Order Status",
    cell: ({ row }) => {
      const order_status = row.original.order.order_status;
      return (
        <Badge
          variant={order_status === "successful" ? "default" : "destructive"}
          className="text-nowrap w-full inline-flex items-center"
        >
          {order_status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order.createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const created = new Date(row.original.order.createdAt);
      return created.toLocaleDateString();
    },
  },
];
