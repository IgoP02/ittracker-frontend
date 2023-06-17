import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Label, Loader } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";
import getStatusDisplayMessage from "../../utils/getStatusDisplayMessage";

export default function StatsDoughChart({ style, arcChange, arcField }) {
  const [field, setField] = useState();
  const [error, setError] = useState();

  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      setChartData(await fetchStats("type"));
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
    }
    if (chartData != null && chartData != "Network Error") {
      console.log(chartData);
      setIsLoading(false);
    }
  }, [field, chartData]);

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
  }
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Reportes activos",
        data: Object.values(chartData),
        backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0", "rgb(200,50,50)", "rgb(100,50,200)"],
      },
    ],
  };
  const options = {
    animation: false,
    responsive: true,
  };
  return (
    <Doughnut
      style={style ? style : null}
      options={{ ...options, maintainAspectRatio: false, responsive: true }}
      data={data}
    />
  );
}
