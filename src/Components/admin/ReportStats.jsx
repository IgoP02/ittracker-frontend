import React, { useEffect, useState } from "react";
import { Card, Loader } from "semantic-ui-react";
import fetchStats from "../utils/fetchStats";
export default function ReportStats({ data }) {
  const style = { fontSize: "32px", color: "rgb(0,0,0,0.8)", textAlign: "center" };
  const descStyle = { fontSize: "20px", textAlign: "center" };
  const [stats, setStats] = useState();
  const [isLoading, setisLoading] = useState(true);
  const getPerStats = async () => {
    setStats(await fetchStats("status"));
    console.log(stats);
  };
  useEffect(() => {
    if (!stats) {
      getPerStats();
    } else if (stats != null && stats != "Network Error") {
      console.log(stats.Asignado);
      setisLoading(false);
    }
  }, [stats]);

  if (stats) {
    var items = [
      {
        header: { content: stats.Asignado, style: style },
        description: { content: "Reportes asignados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(20,100,200,0.5)" },
        key: "11",
      },
      {
        header: { content: stats.Pendiente, style: style },
        description: { content: "Reportes pendientes", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(200,200,0,0.6)" },
        key: "12",
      },
      {
        header: { content: stats.Solucionado, style: style },
        description: { content: "Reportes solucionados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(5,100,10,0.5)" },
        key: "15",
      },
      {
        header: { content: stats.Cerrado, style: style },
        description: { content: "Reportes cerrados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(50,50,100,0.2)" },
        key: "101",
      },
    ];
  }
  if (isLoading || !items) {
    return (
      <div style={{ marginBottom: "3em" }}>
        <Loader
          active
          content={
            typeof stats == "number" || stats == "Network Error" ? "Algo ha salido mal" : "Cargando"
          }
          indeterminate={stats == "Network Error" ? true : false}
        />
      </div>
    );
  }
  return (
    <>
      <Card.Group items={items} stackable centered />
    </>
  );
}
