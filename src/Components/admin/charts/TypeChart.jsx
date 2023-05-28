import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { Label, Loader } from "semantic-ui-react";
import fetchStats from "../../utils/fetchStats";
export default function TypeChart({ labelStyle }) {
  const [field, setField] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setChartData(await fetchStats("type"));
  };
  useEffect(() => {
    if (!chartData) {
      getData();
      console.log(typeof chartData, " ", chartData);
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
    <>
      <Label style={labelStyle} attached="top" content="Reportes Semanales por Tipo" />
      <Doughnut
        options={{ ...options, maintainAspectRatio: false, responsive: true }}
        data={data}
      />
    </>
  );
}
