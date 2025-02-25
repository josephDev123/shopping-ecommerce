import { ReactNode } from "react";

interface Column<TData> {
  key: keyof TData;
  label: ReactNode | string;
}

interface TableProps<TData extends Record<string, any>> {
  columns: Column<TData>[];
  data: TData[] | TData; // ✅ Supports both array & single object
  width?: string;
}

export default function Table<TData extends Record<string, any>>({
  columns,
  data,
  width,
}: TableProps<TData>) {
  // Normalize data: Ensure it's always an array
  const dataArray = Array.isArray(data) ? data : [data];
  console.log(dataArray, columns);

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            {columns.map(({ key, label }) => (
              <th
                key={String(key)}
                className={`border border-gray-300 px-4 py-2 min-w-[${width}]`}
                style={{ width }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataArray?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns?.map(({ key, label }) => (
                <td
                  key={String(key)}
                  className="border border-gray-300 px-4 py-2"
                >
                  {row?.[key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
