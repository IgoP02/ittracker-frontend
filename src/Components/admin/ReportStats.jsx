import React from "react";
import { Card } from "semantic-ui-react";

export default function ReportStats({ data }) {
  const style = { fontSize: "32px", color: "rgb(0,0,0,0.8)" };

  const items = [
    {
      header: { content: "20", style: style },
      description: { content: "Reportes asignados", style: { fontSize: "20px" } },
      style: { width: "10em", backgroundColor: "rgb(20,100,200,0.5)" },
      key: "11",
    },
    {
      header: { content: "13", style: style },
      description: { content: "Reportes pendientes", style: { fontSize: "20px" } },
      style: { width: "10em", backgroundColor: "rgb(200,200,0,0.6)" },
      key: "12",
    },
    {
      header: { content: "118", style: style },
      description: { content: "Reportes solucionados", style: { fontSize: "20px" } },
      style: { width: "10em", backgroundColor: "rgb(5,100,10,0.5)" },
      key: "15",
    },
    {
      header: { content: "139", style: style },
      description: { content: "Reportes cerrados", style: { fontSize: "20px" } },
      style: { width: "10em", backgroundColor: "rgb(50,50,100,0.2)" },
      key: "101",
    },
  ];

  return (
    <>
      <Card.Group items={items} stackable centered />
    </>
  );
}
