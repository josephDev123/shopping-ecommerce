import React from "react";
import TransactionStat from "./indexComponent/TransactionStat";
import LineChart from "./commonComponents/LineChart";

export default function Page() {
  return (
    <section className="flex flex-col p-3">
      <div className="grid grid-cols-4 gap-4 w-full">
        <TransactionStat />
        <div className="w-fit">
          <LineChart />
        </div>
        <TransactionStat />
        <div className="w-fit ">
          <LineChart />
        </div>

        <TransactionStat />
        <div className="w-fit">
          <LineChart />
        </div>
        <TransactionStat />
        <div className="w-fit ">
          <LineChart />
        </div>
      </div>
    </section>
  );
}
