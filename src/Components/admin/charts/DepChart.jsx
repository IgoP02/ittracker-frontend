import { Chart } from "react-chartjs-2";
import { useContext } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Label, Segment } from "semantic-ui-react";

export default function DepChart({ labelStyle }) {
  const data = {
    labels: ["Direc", "Autom", "Quarry", "Log", "Sec", "Accoun", "Public Goods", "QC"],
    datasets: [
      {
        label: "Reports per week",
        data: [10, 3, 2, 19, 5, 9, 1, 5],
        backgroundColor: "rgb(242, 26, 36, 0.85)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    // indexAxis: "y",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      <Label
        style={labelStyle}
        attached="top"
        content="Reportes Semanales por Departamento"
        as="h5"
      />
      <Chart options={options} type="bar" data={data} />
    </>
  );
}
