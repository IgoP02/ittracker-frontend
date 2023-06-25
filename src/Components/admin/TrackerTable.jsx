import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Table,
  Pagination,
  Grid,
  Select,
  Loader,
  Segment,
  Message,
  Checkbox,
  Label,
  Input,
  Button,
  Statistic,
  Icon,
} from "semantic-ui-react";
import SortableTHead from "../SortableTHead";
import SortableTableBody from "./SortableTableBody";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import { ToastContainer } from "react-toastify";
import { debounce } from "lodash";

export default function TrackerTable() {
  const assigneeRef = useRef();
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({ active: false, pending: false });
  const [assignee, setAssignee] = useState("");
  const [tableData, setTableData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [total, setTotal] = useState(0);

  const getData = async (currentPage, perPage, assignee) => {
    try {
      const { data } = await AxiosAdmin.get("/reports", {
        params: {
          page: currentPage,
          perpage: perPage,
          active: filters.active,
          pending: filters.pending,
          assignee: assignee,
        },
      });

      console.log(data);

      setTableData(data.data);
      setTotal(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      if (error.response) {
        console.log(error);
        setError(getStatusDisplayMessage(error.response.status));
      } else if (error.message) {
        console.log(error);

        setError(getStatusDisplayMessage(error.message));
      }
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (!tableData && !error) {
      getData(currentPage, perPage, assignee);
    } else if (tableData) {
      setisLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    console.log(currentPage);
    getData(currentPage, perPage, assignee);
  }, [currentPage, perPage, filters]);

  const columns = useMemo(
    () => [
      { label: "Código", key: "id", sortable: true },
      { label: "Departmento", key: "department", sortable: true },
      { label: "Tipo", key: "type", sortable: true },
      { label: "Problema", key: "issue", sortable: true },
      { label: "Descripción", key: "description", sortable: false },
      { label: "Estado", key: "status", sortable: true },
      { label: "Prioridad", key: "priority", sortable: true },
      { label: "Analista", key: "assignee", sortable: true },
      { label: "Fecha", key: "date", sortable: true },
    ],
    []
  );
  const handleFilterChange = (e, d) => {
    console.log(d.id, " changed");
    setFilters((oldFilters) => ({ ...filters, [d.id]: !oldFilters[d.id] }));
  };

  const handleAssigneeSearch = () => {
    getData(currentPage, perPage, assignee);
  };
  const handleAssigneeChange = (value) => setAssignee(value);
  function handlePageCount(e, d) {
    setPerPage(d.value);
  }
  function handlePageChange(e, d) {
    console.log(d.activePage);
    setCurrentPage(d.activePage);
  }

  const updateTableData = useCallback(() => {
    setTableData(params);
  }, [tableData]);

  function handleSorting(key, sortOrder) {
    if (key) {
      console.log(key);
      console.log(tableData);
      const sortedData = [...tableData].sort((a, b) => {
        return (
          a[key].toString().localeCompare(b[key].toString(), "en", { numeric: true }) *
          (sortOrder === "ascending" ? 1 : -1)
        );
      });
      setTableData(sortedData);
    }
  }

  if (isLoading) {
    return (
      <Grid centered style={{ marginLeft: "40em", marginTop: "10em" }}>
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="center">
            <Loader active size="huge">
              Cargando
            </Loader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else if (error) {
    console.log(error);
    return (
      <Segment basic style={{ marginLeft: "16em" }}>
        <Message error content={error} size={"huge"} />
      </Segment>
    );
  }

  const TablePaginator = ({ size = "huge" }) => {
    return (
      <Pagination
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        tabular
        size={size}
        totalPages={lastPage}
        activePage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  };

  return (
    <Grid style={{ width: "100%" }}>
      <ToastContainer />
      <Grid.Row style={{ padding: "0px" }}>
        <Grid.Row>
          <Segment.Group horizontal>
            <Segment basic>
              <Select
                style={{ marginLeft: "2em" }}
                defaultValue={20}
                compact
                options={displayRowOptions(5)}
                onChange={handlePageCount}
              />
              <Label
                style={{ border: "none", paddingRight: "0.5em", fontWeight: "normal" }}
                basic
                size="large">
                Reportes por página
              </Label>
            </Segment>
            <Segment basic>
              <Checkbox
                checked={filters.active}
                style={{ paddingTop: "1em" }}
                label="Reportes activos"
                slider
                id="active"
                onChange={handleFilterChange}
              />
            </Segment>
            <Segment basic>
              <Checkbox
                checked={filters.pending}
                style={{ paddingTop: "1em" }}
                label="No asignados"
                slider
                id="pending"
                onChange={handleFilterChange}
              />
            </Segment>
            <Segment basic>
              <Label
                style={{ border: "none", paddingRight: "0.5em", fontWeight: "normal" }}
                basic
                size="large">
                Analista:
              </Label>
              <Input
                // label={{ content: "Analista:", style: { border: "none" }, basic: true }}
                style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}
                size="mini"
                id="assignee"
                value={assignee}
                onChange={(e, d) => handleAssigneeChange(d.value)}
                action={{ icon: { name: "search" }, onClick: handleAssigneeSearch }}
                ref={assigneeRef}
              />
              <Button
                circular
                icon="eraser"
                content="Limpiar"
                size="tiny"
                value={assignee}
                color="google plus"
                onClick={() => {
                  setAssignee("");
                  getData(currentPage, perPage, "");
                }}
              />
            </Segment>
            <Segment>
              <Statistic label="Total" value={total} size="tiny" />
            </Segment>
          </Segment.Group>
        </Grid.Row>
        <Segment basic style={{ margin: "auto", padding: "0" }} textAlign="center">
          <TablePaginator key="pagTop" size="tiny" />
        </Segment>
        <Table selectable striped sortable>
          <Table.Header>
            <SortableTHead columns={columns} handleSorting={handleSorting} />
          </Table.Header>
          {tableData ? (
            <SortableTableBody
              columns={columns}
              tableData={tableData}
              setTableData={updateTableData}
            />
          ) : null}
        </Table>
      </Grid.Row>
      <Grid.Row centered textAlign="center" style={{ padding: "0px" }}>
        <Grid.Column textAlign="center">
          <TablePaginator key="pagBottom" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const displayRowOptions = (count = 1) => {
  const options = [];
  let rownum = 0;
  for (let i = 1; i < count + 1; i++) {
    rownum = i * 20;
    options.push({ key: `show${rownum}rows`, value: rownum, text: rownum });
  }
  return options;
};
