"use client";

import { LineChart, Line } from "recharts";

export default function LineCharts() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 420, pv: 2420, amt: 2420 },
    { name: "Page C", uv: 440, pv: 2440, amt: 2440 },
    { name: "Page D", uv: 460, pv: 2460, amt: 2460 },
  ];
  return (
    <LineChart width={300} height={200} data={data} className="">
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}
