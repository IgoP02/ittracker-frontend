import { Table } from "semantic-ui-react";
import { priorityStyles } from "../tablestyles";
import { AxiosAdmin } from "../utils/axiosClients";
import StatusSelector from "./StatusSelector";

export default function SortableTableBody({ columns, tableData, setTableData }) {
  function handleStatusChange(status, i, id) {
    AxiosAdmin.patch(`/update/${id}`, null, { params: { status: status } });
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
                  currentStatus={row.status ? row.status : "none"}
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
