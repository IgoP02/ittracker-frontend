import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Loader, Message } from "semantic-ui-react";
import fetchStats from "../utils/fetchStats";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
export default function ReportStats({ data, setStatusStats }) {
  const style = { fontSize: "32px", color: "rgb(0,0,0,0.8)", textAlign: "center" };
  const descStyle = { fontSize: "20px", textAlign: "center" };

  const [stats, setStats] = useState();
  const [isLoading, setisLoading] = useState(true);

  const getPerStats = async () => {
    try {
      let data = await fetchStats("status");
      setStats(data);
      setStatusStats(data);
    } catch (error) {
      if (error.response) {
        setError(true);
        toast.error(getStatusDisplayMessage(error.response.status), { autoClose: false });
      } else if (error.message) {
        setError(true);
        toast.error("El servidor no está disponible o hay un problema de conexión", {
          autoClose: false,
        });
      }
      console.log("failed");
      setError(true);
    }
    console.log(stats);
  };
  useEffect(() => {
    const intervalID = setInterval(() => {
      getPerStats();
    }, 6000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (!stats) {
      getPerStats();
    } else if (stats != null && stats != "Network Error") {
      console.log(stats.asignado);
      setisLoading(false);
    }
  }, [stats]);

  if (stats) {
    var items = [
      {
        header: { content: stats.asignado, style: style },
        description: { content: "Reportes asignados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(20,100,200,0.5)" },
        key: "11",
      },
      {
        header: { content: stats.pendiente, style: style },
        description: { content: "Reportes pendientes", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(200,200,0,0.6)" },
        key: "12",
      },
      {
        header: { content: stats.solucionado, style: style },
        description: { content: "Reportes solucionados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(5,100,10,0.5)" },
        key: "15",
      },
      {
        header: { content: stats.cerrado, style: style },
        description: { content: "Reportes cerrados", style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(50,50,100,0.2)" },
        key: "101",
      },
    ];
  }
  if (isLoading) {
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
