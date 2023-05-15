import React from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Label } from "semantic-ui-react";

export default function TypeChart({ labelStyle }) {
  const data = {
    labels: ["Network", "Hardware", "Software", "Services"],
    datasets: [
      {
        label: "label1",
        data: [5, 4, 3, 2],
        backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
      },
    ],
  };
  const options = {
    animation: false,
    responsive: true,
  };
  return (
    <>
      <Label style={labelStyle} attached="top" content="Reportes Semanales por Tipo" />
      <Chart
        type="doughnut"
        options={{ ...options, maintainAspectRatio: false, responsive: true }}
        data={data}
      />
    </>
  );
}
