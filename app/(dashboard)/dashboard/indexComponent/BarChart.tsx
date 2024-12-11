"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarController,
  CategoryScale,
  Tooltip,
  BarElement,
  Legend,
  LinearScale,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  LinearScale,
  Tooltip,
  CategoryScale,
  Legend
);

interface BarChartProps {
  data: number[];
  labels: string[] | number[];
  ShowLegends: boolean;
}
export default function BarChart({ data, labels, ShowLegends }: BarChartProps) {
  const dataConfig: ChartData<"bar"> = {
    labels: labels.map((label) => label.toString()),
    datasets: [
      {
        label: "",
        data,
        backgroundColor: ["#4CAF50"],
        borderWidth: 0,
        hoverBackgroundColor: "#45A049",
      },
    ],
  };

  const chartOption: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: ShowLegends,
      },
    },
  };
  return <Bar data={dataConfig} options={chartOption} />;
}
