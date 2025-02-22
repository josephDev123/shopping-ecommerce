import { ReactNode } from "react";

interface TableProps<TData> {
  columns: { key: keyof TData; label: ReactNode }[];
  data: TData[];
}

export default function Table<TData>({ columns, data }: TableProps<TData>) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            {columns.map(({ key, label }) => (
              <th
                key={String(key)}
                className="border border-gray-300 px-4 py-2"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map(({ key }) => (
                <td
                  key={String(key)}
                  className="border border-gray-300 px-4 py-2"
                >
                  {row[key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
