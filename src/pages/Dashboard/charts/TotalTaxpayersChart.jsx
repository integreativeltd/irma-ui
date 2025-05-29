// src/components/charts/TotalTaxpayersChart.jsx

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "../../../components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TotalTaxpayersChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Taxpayers",
        data: [120, 135, 150, 170, 190, 160],
        backgroundColor: "#3B82F6", // Tailwind Blue-500
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw} taxpayers`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: { color: "#475569" },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#475569", font: { size: 13, weight: "500" } },
      },
    },
  };

  return (

    <Card className="w-full h-[440px] bg-white rounded-[10px] border border-gray-200 shadow-sm">
      <CardContent className="p-6 h-full relative">
      <h2 className="text-lg font-semibold mb-4">Total Taxpayers</h2>
      <Bar data={data} options={options} />
      </CardContent>
    </Card>



  );
}
