import { Button } from "semantic-ui-react";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import { generate } from "@pdfme/generator";
import capitalize from "../utils/capitalize";
import template from "../../assets/ittrackerpdftemplate.json";

export default function PDFGenerator({ barChartRef, doughChartRef, statusStats, fields }) {
  const chartFields = {
    type: "tipo",
    department: "departamento",
    assignee: "analista",
  };

  function handleClick() {
    const { pendiente, asignado, solucionado, cerrado } = statusStats;
    // console.log(pendiente, asignado, solucionado, cerrado);
    console.log(fields);
    const barField = fields.barChart;
    const doughField = fields.doughChart;

    const inputs = [
      {
        date: capitalize(dayjs().locale("es").format("dddd[,] D [de] MMMM YYYY")),
        barChart: barChartRef.current.toBase64Image(),
        doughChart: doughChartRef.current.toBase64Image("image/png", 1),
        pendiente: pendiente.toString(),
        asignado: asignado.toString(),
        solucionado: solucionado.toString(),
        cerrado: cerrado.toString(),
        barField: chartFields[barField],
        doughField: chartFields[doughField],
      },
    ];
    generate({ template, inputs }).then((pdf) => {
      console.log(pdf);

      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
    console.log(capitalize(dayjs().locale("es").format("dddd[,] D [de] MMMM YYYY")));
    console.log(barChartRef.current.toBase64Image());
    // console.log(doughChartRef.current.toBase64Image());
    console.log(statusStats);
  }

  return (
    <Button
      icon={{ name: "file pdf", size: "large" }}
      content="Generar PDF con estadísticas"
      color="red"
      fluid
      size="large"
      onClick={handleClick}
    />
  );
}
