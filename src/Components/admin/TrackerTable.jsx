import { useEffect, useRef, useState } from "react";
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
} from "semantic-ui-react";
import SortableTHead from "../SortableTHead";
import SortableTableBody from "./SortableTableBody";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import { ToastContainer } from "react-toastify";

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
      getData(currentPage, perPage);
    } else if (tableData) {
      setisLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    console.log(currentPage);
    getData(currentPage, perPage);
  }, [currentPage, perPage, filters]);

  const columns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Department", key: "department", sortable: true },
    { label: "Type", key: "type", sortable: true },
    { label: "Issue", key: "issue", sortable: true },
    { label: "Description", key: "description", sortable: false },
    { label: "Status", key: "status", sortable: true },
    { label: "Priority", key: "priority", sortable: true },
    { label: "Assignee", key: "assignee", sortable: true },
    { label: "Date", key: "date", sortable: true },
  ];

  function handleFilterChange(e, d) {
    if (d.id == "assignee") {
      console.log("assignee changed");
      setAssignee(d.value);
    } else {
      console.log(d.id, " changed");

      setFilters((oldFilters) => ({ ...filters, [d.id]: !oldFilters[d.id] }));
    }
  }

  function handleAssigneeSearch() {
    getData(currentPage, perPage, assignee);
  }

  function handlePageCount(e, d) {
    setPerPage(d.value);
  }
  function handlePageChange(e, d) {
    console.log(d.activePage);
    setCurrentPage(d.activePage);
  }

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
                Reportes por Página
              </Label>
            </Segment>
            <Segment basic>
              <Checkbox
                checked={filters.active}
                style={{ paddingTop: "1em" }}
                label="Reportes Activos"
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
                onChange={handleFilterChange}
                action={{ icon: { name: "search" }, onClick: handleAssigneeSearch }}
                ref={assigneeRef}
              />
              <Button
                circular
                icon="eraser"
                content="Limpiar"
                size="tiny"
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
        <Table selectable striped sortable>
          <Table.Header>
            <SortableTHead columns={columns} handleSorting={handleSorting} />
          </Table.Header>
          {tableData ? (
            <SortableTableBody
              columns={columns}
              tableData={tableData}
              setTableData={setTableData}
            />
          ) : null}
        </Table>
      </Grid.Row>
      <Grid.Row centered textAlign="center" style={{ padding: "0px" }}>
        <Grid.Column textAlign="center">
          <Pagination
            totalPages={lastPage}
            activePage={currentPage}
            onPageChange={handlePageChange}
          />
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
