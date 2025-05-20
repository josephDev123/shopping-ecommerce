"use client";

import DataTable from "@/components/ui/data-table";
import { ILatestOrderDTO } from "./ILatestOrder";
import { latestOrdersColumn } from "./column/latestOrderColumn";

type ILatestOrderContainer = {
  ColumnData: ILatestOrderDTO[];
};
export default function LatestOrderContainer({
  ColumnData,
}: ILatestOrderContainer) {
  return (
    <section className="w-full overflow-x-auto">
      <DataTable data={ColumnData} columns={latestOrdersColumn} />
    </section>
  );
}
