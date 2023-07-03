import dayjs from "dayjs";
import es from "dayjs/locale/es";
import tz from "dayjs/plugin/timezone";
import relativetime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
import { priorityStyles } from "../tablestyles";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import { getUserName } from "../utils/manageLogin";
import StatusSelector from "./StatusSelector";

export default function SortableTableBody({ columns, tableData, setTableData }) {
  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(relativetime);

  // const diff = import("dayjs/plugin/d");
  async function handleStatusChange(status, i, id) {
    if (getUserName() == "admin") {
      toast.error("Usuario de administrador no está habilitado para funciones de analista", {
        hideProgressBar: true,
        autoClose: false,
      });
      return;
    }
    try {
      const { data } = await AxiosAdmin.patch(`/reports/update/${id}`, undefined, {
        params: {
          status: status,
        },
      });

      setTableData([
        ...tableData.map((row, j) => {
          if (i === j) {
            // console.log("UPDATED ", status);
            row.status = status;
            if (row.status == "A") row.assignee = data.assignee;
            if (row.status == "P") row.assignee = "NA";

            return row;
          }
          return row;
        }),
      ]);
    } catch (error) {
      if (error.response) toast.error(getStatusDisplayMessage(error.response.status));
      else if (error.message) toast.error(getStatusDisplayMessage(error.message));
    }
  }

  const rows = useMemo(() => {
    return tableData.map((row, index) => {
      return (
        <Table.Row key={`row_${index}`} className={tableData.length <= 5 ? "smallRow" : null}>
          {columns.map((column) => {
            const dayJsParsed = dayjs.utc(row[column.key]);
            return (
              <Table.Cell
                key={`${column.key}_${index}`}
                style={column.key === "priority" ? priorityStyles[row.priority - 1] : null}>
                {column.key === "status" ? (
                  <StatusSelector
                    key={`selector_${row.id}`}
                    currentStatus={row.status ? row.status : "none"}
                    currentRow={index}
                    reportId={row.id}
                    handleStatusChange={handleStatusChange}
                    fromTable={true}
                  />
                ) : column.key == "date" ? (
                  `${dayJsParsed
                    .tz("America/Caracas")
                    .format("DD-MM-YYYY[,] hh:mm A")} (${dayJsParsed.locale("es").fromNow()})`
                ) : (
                  row[column.key]
                )}
              </Table.Cell>
            );
          })}
        </Table.Row>
      );
    });
  }, [tableData]);

  const EmptyBody = () => {
    const emptyRow = columns.map((column, index) => (
      <Table.Cell key={`${column.key}${index}`}>
        {column.key == "description" ? (
          <span style={{ fontSize: "2em", fontWeight: "bolder" }}>
            No se han encontrado resultados
          </span>
        ) : (
          ""
        )}
      </Table.Cell>
    ));
    return <Table.Row id="emptyrow">{emptyRow}</Table.Row>;
  };
  return (
    <Table.Body key="TrackerTableBody">{tableData.length > 0 ? rows : <EmptyBody />}</Table.Body>
  );
}
