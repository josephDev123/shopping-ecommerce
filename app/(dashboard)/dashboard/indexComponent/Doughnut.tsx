"use client";

import { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  value: number;
  maxValue: number;
  labelsData?: string[];
  backgroundColors: string[];
}
export default function DoughnutChart({
  value,
  maxValue,
  labelsData,
  backgroundColors,
}: DoughnutChartProps) {
  const progress = Math.min((value / maxValue) * 100, 100); // Clamp to 100%
  const remaining = 100 - progress;
  const Data: ChartData<"doughnut"> = {
    labels: labelsData,
    datasets: [
      {
        data: [progress, remaining],
        // label: "",
        // backgroundColor: ["#4CAF50", "#E0E0E0"],
        backgroundColor: backgroundColors,
        hoverBackgroundColor: ["#45A049", "#D6D6D6"],

        borderWidth: 0,
      },
    ],
  };

  const chartOption: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true, // Change the label shape to circles
          pointStyle: "circle", // Specifically define the point style
        },
      },
    },
  };
  return <Doughnut data={Data} options={chartOption} />;
}
