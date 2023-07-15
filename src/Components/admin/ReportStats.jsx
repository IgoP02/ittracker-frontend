import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Container, Divider, Loader, Message, Segment } from "semantic-ui-react";
import fetchStats from "../utils/fetchStats";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import percentage from "../utils/percentage";
export default function ReportStats({ data, setStatusStats }) {
  const style = { fontSize: "32px", color: "rgb(0,0,0,0.8)", textAlign: "center" };
  const descStyle = { fontSize: "20px", textAlign: "center" };

  const [stats, setStats] = useState();
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(true);

  const getPerStats = async () => {
    try {
      let data = await fetchStats("status");
      console.log("total: ", data.cerrado + data.pendiente + data.solucionado + data.asignado);
      setStats({
        ...data,
        total: data.cerrado + data.pendiente + data.solucionado + data.asignado,
      });
      setStatusStats(data);
    } catch (error) {
      if (error.response) {
        toast.error(getStatusDisplayMessage(error.response.status), { autoClose: false });
      } else if (error.message) {
        toast.error("El servidor no está disponible o hay un problema de conexión", {
          autoClose: false,
        });
      }
      setError(true);
      console.log("failed");
    }
    console.log(stats);
  };
  useEffect(() => {
    if (error) {
      var intervalID = setInterval(() => {
        getPerStats();
      }, 6000);
      return () => {
        clearInterval(intervalID);
      };
    }
  }, []);

  useEffect(() => {
    if (!stats && !error) {
      getPerStats();
    } else if (stats != null && (stats != "Network Error" || error)) {
      setisLoading(false);
    }
  }, [stats]);

  if (stats) {
    const Desc = (status, statNumber) => {
      return (
        <>
          Reportes {status}
          <Divider fitted style={{ margin: "5px" }} />
          <p style={{ opacity: "0.6" }}>%{percentage(statNumber, stats.total)}</p>
        </>
      );
    };
    var items = [
      {
        header: { content: stats.asignado, style: style },
        description: { content: Desc("asignados", stats.asignado), style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(20,100,200,0.5)" },
        key: "repstats1",
      },
      {
        header: { content: stats.pendiente, style: style },
        description: { content: Desc("pendientes", stats.pendiente), style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(200,200,0,0.6)" },
        key: "repstats2",
      },
      {
        header: { content: stats.solucionado, style: style },
        description: {
          content: Desc("solucionados", stats.solucionado),
          style: descStyle,
        },
        style: { width: "10em", backgroundColor: "rgb(5,100,10,0.5)" },
        key: "repstats3",
      },
      {
        header: { content: stats.cerrado, style: style },
        description: { content: Desc("cerrados", stats.cerrado), style: descStyle },
        style: { width: "10em", backgroundColor: "rgb(50,50,100,0.2)" },
        key: "repstats4",
      },
      {
        header: {
          content: stats.total,
          style: style,
        },
        description: {
          content: Desc("total", stats.total),
          style: { ...descStyle, marginBottom: "5px" },
        },
        style: { width: "10em", backgroundColor: "rgb(220,220,220,0.3)" },
        key: "repstats5",
      },
    ];
  }
  if (error) {
    return <Message error content="Algo ha salido mal" />;
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
    <Segment basic compact style={{ margin: "auto" }}>
      <Card.Group items={items} centered />
    </Segment>
  );
}
