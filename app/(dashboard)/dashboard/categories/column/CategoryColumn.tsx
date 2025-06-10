import { CategoryType } from "@/app/types/categoryType";
import { ColumnDef } from "@tanstack/react-table";

export const CategoryColumn: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "_id",
    header: "Category",
    id: "category",
    cell: ({ row }) => <div className="w-32 truncate">{row.original._id}</div>,
  },

  {
    accessorKey: "products",
    header: "Category item",
    cell: ({ row }) => {
      const productName = row.original.products?.[0]?.productName ?? "";
      const shortName =
        productName.length > 10
          ? productName.slice(0, 10) + "..."
          : productName;
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
          title={row.original.products?.[0]?.productName || ""}
          className="w-32  bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition-colors"
        >
          {row.getIsExpanded() ? `${shortName}👇` : `${shortName}👉`}
        </button>
      ) : (
        ""
      );
    },
  },
];
