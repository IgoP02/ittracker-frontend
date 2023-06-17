import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Label, Loader, Message } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";
import getStatusDisplayMessage from "../../utils/getStatusDisplayMessage";

export default function StatsBarChart({ labelStyle, barField }) {
  const [error, setError] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      setChartData(await fetchStats("department"));
    } catch (error) {
      if (error.response) {
        setError(getStatusDisplayMessage(error.response.status));
      } else if (error.message) {
        setError(getStatusDisplayMessage(error.message));
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!chartData) {
      getData();
      console.log(chartData);
    }
    if (chartData != null && chartData != "Network Error") {
      console.log(chartData);
      setIsLoading(false);
    }
  }, [chartData, barField]);

  if (isLoading == true) {
    return (
      <Loader
        active
        content={
          typeof chartData == "number" || chartData == "Network Error"
            ? "Algo ha salido mal"
            : "Cargando"
        }
        indeterminate={chartData == "Network Error" ? true : false}
        style={{ marginTop: "2em" }}
      />
    );
  } else if (error) {
    <Message error content={error} />;
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
  return <Bar options={options} data={data} />;
}
