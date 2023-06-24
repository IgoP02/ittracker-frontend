import { Doughnut } from "react-chartjs-2";
import { forwardRef, useEffect, useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Loader, Message } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";
import getStatusDisplayMessage from "../../utils/getStatusDisplayMessage";

export default forwardRef(function StatsDoughChart({ attributes, doughField }, ref) {
  const [error, setError] = useState();
  const [oldField, setOldField] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async (field) => {
    try {
      setOldField(doughField);
      setChartData(await fetchStats(field));
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
      getData(doughField);
      console.log(doughField);
    } else if (chartData && oldField != doughField) {
      setIsLoading(true);
      getData(doughField);
    }
    if (chartData != null && chartData != "Network Error") {
      console.log(chartData);
      setIsLoading(false);
    }
  }, [doughField, chartData]);

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
    devicePixelRatio: 2,
    animation: false,
    responsive: true,
  };
  return (
    <Doughnut
      ref={ref}
      {...attributes}
      options={{
        ...options,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          datalabels: { color: "white", font: { family: "inter", size: 18, weight: "bold" } },
        },
      }}
      data={data}
    />
  );
});
