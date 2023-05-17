import { Table } from "semantic-ui-react";
import { priorityStyles } from "../tablestyles";
import { AxiosAdmin } from "../utils/axiosClients";
import StatusSelector from "./StatusSelector";

export default function SortableTableBody({ columns, tableData, setTableData }) {
  const statuses = {
    A: "Asignado",
    C: "Cerrado",
    P: "Pendiente",
    S: "Solucionado",
  };
  function handleStatusChange(status, i, id) {
    AxiosAdmin.get(`/update/${id}/${status}`);
    setTableData([
      ...tableData.map((row, j) => {
        if (i === j) {
          // console.log("UPDATED ", status);
          row.status = status;
          return row;
        }
        return row;
      }),
    ]);
  }

  const rows = tableData.map((row, index) => {
    return (
      <Table.Row key={`row_${index}`}>
        {columns.map((column) => {
          return (
            <Table.Cell
              key={`${column.key}_${index}`}
              style={column.key === "priority" ? priorityStyles[row.priority - 1] : null}>
              {column.key === "status" ? (
                <StatusSelector
                  key={`selector_${row.id}`}
                  currentStatus={statuses[row.status]}
                  currentRow={index}
                  reportId={row.id}
                  handleStatusChange={handleStatusChange}
                />
              ) : (
                row[column.key]
              )}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  });
  return <Table.Body key="TrackerTableBody">{rows}</Table.Body>;
}
