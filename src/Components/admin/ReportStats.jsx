import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import fetchStats from "../utils/fetchStats";
export default function ReportStats({ data }) {
  const style = { fontSize: "32px", color: "rgb(0,0,0,0.8)" };
  const [stats, setStats] = useState();
  const [isLoading, setisLoading] = useState(true);
  const getPerStats = async () => {
    setStats(await fetchStats("status"));
    console.log(stats);
  };
  useEffect(() => {
    if (!stats) {
      getPerStats();
    } else if (stats) {
      console.log(stats.Asignado);
      setisLoading(false);
    }
  }, [stats]);

  if (stats) {
    var items = [
      {
        header: { content: stats.Asignado, style: style },
        description: { content: "Reportes asignados", style: { fontSize: "20px" } },
        style: { width: "10em", backgroundColor: "rgb(20,100,200,0.5)" },
        key: "11",
      },
      {
        header: { content: stats.Pendiente, style: style },
        description: { content: "Reportes pendientes", style: { fontSize: "20px" } },
        style: { width: "10em", backgroundColor: "rgb(200,200,0,0.6)" },
        key: "12",
      },
      {
        header: { content: stats.Solucionado, style: style },
        description: { content: "Reportes solucionados", style: { fontSize: "20px" } },
        style: { width: "10em", backgroundColor: "rgb(5,100,10,0.5)" },
        key: "15",
      },
      {
        header: { content: stats.Cerrado, style: style },
        description: { content: "Reportes cerrados", style: { fontSize: "20px" } },
        style: { width: "10em", backgroundColor: "rgb(50,50,100,0.2)" },
        key: "101",
      },
    ];
  }
  if (isLoading || !items) {
    return <p>Loading</p>;
  }
  return (
    <>
      <Card.Group items={items} stackable centered />
    </>
  );
}
