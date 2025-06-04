"use client";

import DataTable from "@/components/ui/data-table";
import { ILatestOrderDTO, IProduct } from "./ILatestOrder";
import { latestOrdersColumn } from "./column/latestOrderColumn";

type ILatestOrderContainer = {
  ColumnData: ILatestOrderDTO[];
};
export default function LatestOrderContainer({
  ColumnData,
}: ILatestOrderContainer) {
  return (
    <section className="w-full overflow-x-auto">
      <DataTable
        data={ColumnData}
        columns={latestOrdersColumn}
        rowCount={ColumnData.length}
        hiddenPaginationBtn={true} // Assuming you want to show the total number of rows
        // getSubRows={(row) => row.items!}
        // renderSubRow={(row) => (
        //   <div className="p-4 bg-gray-100 rounded-md">
        //     <p className="font-semibold mb-2">Items:</p>
        //     {row?.items?.map((item: IProduct) => (
        //       <div key={item._id} className="ml-4">
        //         {item.productName} - {item.productQuantity}
        //       </div>
        //     ))}
        //   </div>
        // )}
      />
    </section>
  );
}
