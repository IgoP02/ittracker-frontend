import { Bar, Pie, Line } from "react-chartjs-2";
// import dataLabelsPlugin from "chartjs-plugin-datalabels";
import { forwardRef, useEffect, useState } from "react";
import { Loader, Message } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";
import getStatusDisplayMessage from "../../utils/getStatusDisplayMessage";

export default forwardRef(function StatsBarChart({ barField, attributes }, ref) {
  const [error, setError] = useState();
  const [oldField, setOldField] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async (field) => {
    try {
      setOldField(barField);
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
    console.log("o", oldField);
    console.log("c", chartData);

    if (!chartData) {
      getData(barField);
      console.log("first chardata");
    } else if (chartData && oldField != barField) {
      setIsLoading(true);
      getData(barField);
      console.log("not equal", chartData);
    }
    if (chartData && chartData != "Network Error" && typeof chartData === "object") {
      setIsLoading(false);
      return;
    }
  }, [barField, chartData]);

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
        backgroundColor: "rgb(220, 56, 66)",
      },
    ],
  };
  const options = {
    devicePixelRatio: 3,
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
      datalabels: {
        align: "center",
        anchor: "center",
        color: "white",
        font: { size: 14, weight: "bold" },
      },
      legend: { display: false },
    },
  };
  return <Bar {...attributes} options={options} data={data} ref={ref} />;
});
