import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return <Pie data={{ datasets: chartData.datasets, labels: chartData.labels }} />;
}

export default PieChart;
