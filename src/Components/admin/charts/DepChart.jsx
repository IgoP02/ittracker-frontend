import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Label } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";

export default function DepChart({ labelStyle }) {
  const [field, setField] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setChartData(await fetchStats("department"));
  };
  useEffect(() => {
    if (!chartData) {
      getData();
      console.log(chartData);
    }
    if (chartData) {
      console.log(chartData);
      setIsLoading(false);
    }
  }, [field, chartData]);

  if (!chartData) {
    return <p>Loading</p>;
  }
  const data = {
    datasets: [
      {
        label: "Reportes activos",
        data: chartData,
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
        content="Reportes Activos por Departamento"
        as="h5"
      />
      <Chart options={options} type="bar" data={data} />
    </>
  );
}
