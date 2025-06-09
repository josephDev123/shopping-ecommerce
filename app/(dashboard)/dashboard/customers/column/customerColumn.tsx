import { ColumnDef } from "@tanstack/react-table";
import { ICustomerColumn } from "./IcustomerColumn";

export const CustomerColumn: ColumnDef<ICustomerColumn>[] = [
  {
    accessorKey: "",
    header: "avatar",
    cell: ({ row }) => {
      const acronym = row.original.name
        .split(" ")
        .filter((word) => word.length > 0)
        .map((word) => word[0])
        .join("");
      return (
        <div
          title={row.getValue("_id")}
          className=" truncate rounded-full size-10 bg-gray-100 flex flex-col items-center justify-center font-semibold"
        >
          {acronym.toUpperCase()}
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    cell: ({ row }) => <div className="w-32 truncate">{row.original.name}</div>,
  },

  {
    accessorKey: "email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "phonenumber",
    header: "Phone number",
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40">{row.original.phonenumber}</div>
    ),
  },

  {
    accessorKey: "address",
    id: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40">{row.original.address}</div>
    ),
  },
  {
    accessorKey: "town",
    id: "town",
    header: "Town",
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40">{row.original.town}</div>
    ),
  },

  {
    accessorKey: "province",
    header: "Province",
    cell: ({ row }) => (
      <div className="flex flex-wrap w-40">{row.original.province}</div>
    ),
  },

  {
    accessorKey: "country",
    id: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="flex flex-wrap truncate">{row.original.country}</div>
    ),
  },

  {
    accessorKey: "zipCode",
    header: "ZipCode",
  },

  {
    accessorKey: "additionalInfo",
    header: "Additional Info",
    cell: ({ row }) => (
      <div className="flex flex-wrap w-52 ">{row.original.additionalInfo}</div>
    ),
  },
];
